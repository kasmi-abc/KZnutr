# KZ Nutrition — Supplements Store

**v1.0.0 — Stable** — Stack: Next.js 16 + TypeScript + Tailwind CSS 4 + Prisma 6 + Neon PostgreSQL.

Bilingual (FR/AR, RTL-ready) supplements store with cash-on-delivery checkout, order tracking, admin panel with 2FA, and a black/golden-yellow KZ Nutrition identity (#FFD700).
Full catalog, cart, bundles, blog, BMI calculator, loyalty points, stock batches, and store-location section with embedded map.

## Store

- Instagram: https://www.instagram.com/kznutrition/
- Facebook: Zaki nutrition (link pending, falls back to home)
- Phones: 0796 85 18 07, 0797 79 85 54
- Address: Centre commercial Mohamadia Mall, local 860, Algiers 16000
- Hours: Sat-Thu 10h-20h, Fri 16h-20h

## Run locally

```bash
npm install
cp .env.example .env   # fill DATABASE_URL, ADMIN_USER, ADMIN_PASS_HASH, AUTH_SECRET
npx prisma db push
npm run db:seed        # demo products + admin username1234 / password123
npm run dev            # http://localhost:3000
```

## Env vars

See `.env.example`: `DATABASE_URL`, `ADMIN_USER` / `ADMIN_PASS_HASH` (bcrypt),
`AUTH_SECRET` + `NEXTAUTH_SECRET` (32+ random chars), `NEXTAUTH_URL` (production URL on deploy).

## Structure

```text
src/app/          storefront pages + /admin panel + /api routes
src/components/   Header, Footer, CartDrawer, goshop/ homepage sections
src/i18n/         fr/ar dictionaries + language provider
src/lib/          auth (JWT), TOTP 2FA, rate-limit, validators, alerts
prisma/           schema.prisma + seed.mjs
```

Admin: `/admin/login` (bcrypt + optional TOTP 2FA, 5-fail lockout, audit log).
Health probe: `GET /api/health` — point an uptime monitor at it.
Location section renders globally before Footer (hidden on `/admin`).

## Versions

- **v1.0.0 (current, Stable)** — KZ Nutrition rebrand (black/golden-yellow theme, logo, store-location section, live social/maps links).
- Next release: v1.1.0 (planned) — online payment (Chargily/SATIM), GA4 events, load-test pass.
