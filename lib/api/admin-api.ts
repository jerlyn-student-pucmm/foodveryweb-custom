import { getPublicApiUrl } from "@/lib/env";
import type {
  AddPointsBody,
  ClaimStaffRowDTO,
  LookupUserByEmailResponse,
  MenuResponseDTO,
  PlateDTO,
  PlatePhotoUploadResponseDTO,
  PointTransactionDTO,
  RewardDTO,
  StaffStatusResponse,
  TransactionsPageDTO,
} from "@/types/admin";

const TIMEOUT_MS = 60_000;

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (data?.detail) return typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
    if (data?.message) return String(data.message);
    return JSON.stringify(data);
  } catch {
    return await res.text();
  }
}

export async function apiGetJson<T>(
  path: string,
  token: string,
  init?: RequestInit
): Promise<T> {
  const base = getPublicApiUrl().replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(await parseError(res));
    }
    return res.json() as Promise<T>;
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error(
        `Sin conexión a la API (${url}). ¿CORS, VPN o NEXT_PUBLIC_API_URL incorrecta? ${e.message}`
      );
    }
    throw e;
  } finally {
    clearTimeout(t);
  }
}

export async function apiSendJson<T>(
  path: string,
  token: string,
  body: unknown,
  method: "POST" | "PATCH" | "DELETE" = "POST"
): Promise<T> {
  const base = getPublicApiUrl().replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: method === "DELETE" ? undefined : JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(await parseError(res));
    }
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  } finally {
    clearTimeout(t);
  }
}

export async function apiUploadPlatePhoto(
  plateUuid: string,
  token: string,
  file: File
): Promise<PlatePhotoUploadResponseDTO> {
  const base = getPublicApiUrl().replace(/\/$/, "");
  const url = `${base}/api/plates/uuid/${plateUuid}/photos`;
  const form = new FormData();
  form.append("file", file);
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });
    if (!res.ok) {
      throw new Error(await parseError(res));
    }
    return res.json() as Promise<PlatePhotoUploadResponseDTO>;
  } finally {
    clearTimeout(t);
  }
}

export async function getPlateCategories(): Promise<string[]> {
  const base = getPublicApiUrl().replace(/\/$/, "");
  const res = await fetch(`${base}/api/plates/categories`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  return res.json() as Promise<string[]>;
}

export const adminApi = {
  getStaffStatus: (token: string) =>
    apiGetJson<StaffStatusResponse>("/api/auth/is-employee", token),

  getMenu: (token: string) => apiGetJson<MenuResponseDTO>("/api/plates/menu", token),

  createPlate: (token: string, body: Record<string, unknown>) =>
    apiSendJson<PlateDTO>("/api/plates/", token, body, "POST"),

  updatePlate: (token: string, uuid: string, body: Record<string, unknown>) =>
    apiSendJson<PlateDTO>(`/api/plates/uuid/${uuid}`, token, body, "PATCH"),

  deletePlate: async (token: string, uuid: string) => {
    const base = getPublicApiUrl().replace(/\/$/, "");
    const url = `${base}/api/plates/uuid/${uuid}`;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "DELETE",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(await parseError(res));
      }
      return res.json() as Promise<PlateDTO>;
    } finally {
      clearTimeout(t);
    }
  },

  uploadPhoto: (token: string, plateUuid: string, file: File) =>
    apiUploadPlatePhoto(plateUuid, token, file),

  addPoints: (token: string, body: AddPointsBody) =>
    apiSendJson<PointTransactionDTO>("/api/points/add", token, body, "POST"),

  getTransactions: (token: string, page = 1, pageSize = 20) =>
    apiGetJson<TransactionsPageDTO>(
      `/api/points/transactions?page=${page}&page_size=${pageSize}`,
      token
    ),

  lookupUserByEmail: (token: string, email: string) =>
    apiGetJson<LookupUserByEmailResponse>(
      `/api/auth/lookup-user-by-email?email=${encodeURIComponent(email.trim())}`,
      token
    ),

  listRewardsStaff: (token: string) =>
    apiGetJson<RewardDTO[]>("/api/rewards/staff", token),

  createReward: (
    token: string,
    body: {
      name: string;
      description?: string | null;
      points_required: number;
      image_url?: string | null;
    }
  ) => apiSendJson<RewardDTO>("/api/rewards/staff", token, body, "POST"),

  updateReward: (
    token: string,
    rewardUuid: string,
    body: {
      name?: string;
      description?: string | null;
      points_required?: number;
      image_url?: string | null;
    }
  ) =>
    apiSendJson<RewardDTO>(
      `/api/rewards/staff/uuid/${rewardUuid}`,
      token,
      body,
      "PATCH"
    ),

  listClaimsStaff: (token: string, pendingOnly?: boolean) => {
    const q =
      pendingOnly === true ? "?pending_only=true" : pendingOnly === false ? "?pending_only=false" : "";
    return apiGetJson<ClaimStaffRowDTO[]>(`/api/rewards/staff/claims${q}`, token);
  },

  deliverClaim: (token: string, claimedUuid: string) =>
    apiSendJson<ClaimStaffRowDTO>(
      `/api/rewards/staff/claims/uuid/${claimedUuid}/deliver`,
      token,
      {},
      "PATCH"
    ),

  deleteReward: async (token: string, rewardUuid: string) => {
    const base = getPublicApiUrl().replace(/\/$/, "");
    const url = `${base}/api/rewards/staff/uuid/${rewardUuid}`;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "DELETE",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(await parseError(res));
      }
    } finally {
      clearTimeout(t);
    }
  },
};
