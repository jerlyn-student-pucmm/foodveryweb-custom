import type {
  MenuResponse,
  SpotlightedPlateResponse,
  CategoriesResponse,
  PlateByIdResponse,
  AddPlateRequest,
  AddPlateResponse,
} from "@/types/plates";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://api.foodvery.com.do";
const FETCH_TIMEOUT_MS = 10_000;

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new Error('API request timed out');
      }
      throw err;
    }
    throw new Error('Failed to fetch');
  }
}

export const platesAPI = {
  getMenu: async (): Promise<MenuResponse> => {
    return fetchAPI<MenuResponse>('/api/plates/menu');
  },

  getSpotlighted: async (): Promise<SpotlightedPlateResponse> => {
    return fetchAPI<SpotlightedPlateResponse>('/api/plates/spotlighted');
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    const raw = await fetchAPI<string[] | CategoriesResponse>("/api/plates/categories");
    if (Array.isArray(raw)) return { categories: raw };
    return raw;
  },

  getPlateById: async (plateId: string): Promise<PlateByIdResponse> => {
    return fetchAPI<PlateByIdResponse>(`/api/plates/${plateId}`);
  },

  addPlate: async (data: AddPlateRequest): Promise<AddPlateResponse> => {
    return fetchAPI<AddPlateResponse>('/api/plates/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
