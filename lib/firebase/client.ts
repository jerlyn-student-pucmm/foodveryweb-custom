"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirebasePublicConfig } from "@/lib/env";

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  const cfg = getFirebasePublicConfig();
  if (!cfg) {
    throw new Error(
      "Firebase no está configurado. Añade las variables NEXT_PUBLIC_FIREBASE_* en .env.local (ver .env.example)."
    );
  }
  app = getApps().length ? getApps()[0]! : initializeApp(cfg);
  return app;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
