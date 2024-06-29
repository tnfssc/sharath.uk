# [sharath.uk](.)

This is a monorepo containing all the code for my personal website [sharath.uk](https://sharath.uk).

---

## [@sharath.uk/ui](./packages/ui)

This is the UI part of my website which contains the entire website made using React.

![React](https://img.shields.io/badge/React-18.2.0-71a6ba?style=for-the-badge&logo=react)
![UnoCSS](https://img.shields.io/badge/UnoCSS-0.58.5-white?style=for-the-badge&logo=unocss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-4476c0?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.1.4-5d60a6?style=for-the-badge&logo=vite)
![Bun](https://img.shields.io/badge/Bun-1.1.4-f5f5f5?style=for-the-badge&logo=bun)
![shadcn/ui](https://img.shields.io/badge/shadcn-ui-000000?style=for-the-badge&logo=shadcnui)

---

## [@sharath.uk/api](./packages/api)

This is a Cloudflare Workers API that I use to show poems on my website.

![cloudflare/workers](https://img.shields.io/badge/Workers-000000?style=for-the-badge&logo=cloudflareworkers)
![llama3](https://img.shields.io/badge/LLAMA3-000000?style=for-the-badge&logo=meta)
![dreamshaper](https://img.shields.io/badge/DreamShaper-000000?style=for-the-badge&logo=imagedotsc)
![hono](https://img.shields.io/badge/hono-000000?style=for-the-badge&logo=hono)
![firebase](https://img.shields.io/badge/Firebase-000000?style=for-the-badge&logo=firebase)

---

## Instructions

- Create a file called `.dev.vars` at `./packages/api/.dev.vars` with the following content:

```sh
FIREBASE_SERVICE_ACCOUNT_KEY='{...}'

CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...

TURSO_DATABASE_URL="libsql://....turso.io"
TURSO_AUTH_TOKEN=...

CDN_BASE_URL="https://cdn.sharath.uk/"

GITHUB_PAT=...

GHOST_URL="https://ghost.sharath.uk"
GHOST_KEY=...
```

- Create a file called `.env` at `./packages/ui/.env` with the following content:

```sh
VITE_API_ENDPOINT='http://localhost:8787'
VITE_PUBLIC_BASE_URL='http://localhost:5173'
```

- Login to `wrangler-cli` using the following command:

```sh
bun x wrangler login
```

- You can start both dev servers using the following command:

```sh
bun dev
```

- Open `http://localhost:5173` in your browser to view the website.
