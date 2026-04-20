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

## Docker: reinicio programado

`docker compose up -d` levanta el servicio `daily-restart`, que cada 24 h ejecuta `docker restart` sobre el contenedor del servicio `app` (detectado por etiquetas de Compose). Variables opcionales en `.env` o el entorno: `COMPOSE_PROJECT_NAME` (debe coincidir con el nombre de proyecto de Compose), `RESTART_INTERVAL_SECONDS`, `RESTART_TARGET_SERVICE`, o `RESTART_CONTAINER_NAME` si prefieres reiniciar por nombre fijo (p. ej. `foodveryweb-app-1`). Montar `/var/run/docker.sock` otorga control amplio sobre Docker en el host; valora alternativas (cron en el VPS) si ese riesgo no te encaja.
