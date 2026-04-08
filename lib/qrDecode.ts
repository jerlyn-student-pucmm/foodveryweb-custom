/**
 * Normalize QR / pasted text into a Firebase UID when possible.
 * Wallet payloads may be plain uid or JSON.
 */
export function parseUserUidFromQrText(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  if (/^[a-zA-Z0-9_-]{20,128}$/.test(t)) {
    return t;
  }
  try {
    const j = JSON.parse(t) as unknown;
    if (typeof j === "object" && j !== null) {
      const o = j as Record<string, unknown>;
      const uid = o.user_uid ?? o.userUid ?? o.uid;
      if (typeof uid === "string" && uid.length > 0) return uid;
    }
  } catch {
    /* not JSON */
  }
  return null;
}

type BarcodeDetectorLike = {
  detect: (image: ImageBitmap) => Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorCtor = new (opts: { formats: string[] }) => BarcodeDetectorLike;

export async function decodeQrFromImageFile(file: File): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const ctor = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor })
    .BarcodeDetector;
  if (!ctor) return null;
  const detector = new ctor({ formats: ["qr_code"] });
  const bmp = await createImageBitmap(file);
  try {
    const codes = await detector.detect(bmp);
    for (const c of codes) {
      const raw = c.rawValue ?? "";
      const uid = parseUserUidFromQrText(raw);
      if (uid) return uid;
    }
    if (codes[0]?.rawValue) {
      return codes[0].rawValue.trim() || null;
    }
  } finally {
    bmp.close();
  }
  return null;
}
