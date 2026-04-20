This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# foodveryweb

Sitio público FoodVery (Next.js). Panel admin en `/admin` (Firebase + API).

## Docker: Redis y rate limiting

Compose incluye `redis` y la app depende de él. Límite por IP en `proxy.ts` (Next 16) con `REDIS_URL`, `RATE_LIMIT_ENABLED`, `RATE_LIMIT_REQUESTS`, `RATE_LIMIT_WINDOW_SECONDS` (mismos nombres que en la API). Sin `REDIS_URL` o con Redis caído, el proxy **no bloquea** (fail-open). En local sin Redis: `RATE_LIMIT_ENABLED=false` o `pnpm dev` con esas variables.

## Docker: reinicio programado

`docker compose up -d` levanta el servicio `daily-restart`, que cada 24 h ejecuta `docker restart` sobre el contenedor del servicio `app` (detectado por etiquetas de Compose). Variables opcionales en `.env` o el entorno: `COMPOSE_PROJECT_NAME` (debe coincidir con el nombre de proyecto de Compose), `RESTART_INTERVAL_SECONDS`, `RESTART_TARGET_SERVICE`, o `RESTART_CONTAINER_NAME` si prefieres reiniciar por nombre fijo (p. ej. `foodveryweb-app-1`). Montar `/var/run/docker.sock` otorga control amplio sobre Docker en el host; valora alternativas (cron en el VPS) si ese riesgo no te encaja.

El servicio `app` usa rotación de logs `json-file` (`max-size` / `max-file`). El sidecar monta `/var/lib/docker/containers` (ruta real del `LogPath` en **Linux**) y, con `TRUNCATE_CONTAINER_LOGS=1` (valor por defecto), intenta vaciar el log json del contenedor tras cada reinicio. En Docker Desktop macOS/Windows el montaje suele no coincidir con el `LogPath` real; pon `TRUNCATE_CONTAINER_LOGS=0` o confía solo en la rotación.
