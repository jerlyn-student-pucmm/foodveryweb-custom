/**
 * Public env (NEXT_PUBLIC_*) for Firebase + API.
 * Copy .env.example → .env.local (see repo root foodveryweb).
 */

export type FirebasePublicConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

export function getPublicApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "https://api.foodvery.com.do";
}

/** Returns null if Firebase env is incomplete (e.g. during build without .env). */
export function getFirebasePublicConfig(): FirebasePublicConfig | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyB2mE-Hz-jKeV7DpGzN1XJYaK_ZK2CUlU0';
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'foodvery-90e91.firebaseapp.com';
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'foodvery-90e91';
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1044144037760:web:0792ed93c0432763b7ab65';
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1044144037760';
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'foodvery-90e91.firebasestorage.app';
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-LX5R4Y7S4G';
  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  };
}
