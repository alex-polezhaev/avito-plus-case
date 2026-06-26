# Avito Plus: Backend

A **Google Sheets-driven Avito ad-duplication, renewal and statistics engine.**

Sellers manage their Avito listings as rows in a Google spreadsheet. The backend
turns each spreadsheet into an Avito **autoload XML feed**, expands per-row
"spintax" templates into unique titles/descriptions/prices, automatically
re-publishes blocked or expired ads with fresh ids, pulls back Avito autoload
**reports and statistics**, optionally hosts ad photos on **Yandex.Disk**, and
bills users through **Tinkoff** payments.

> Portfolio note: this is a cleaned-up, English-only showcase extracted from a
> production project. Secrets are replaced with `*.example` placeholders.

---

## What it does

- **Spreadsheet → Avito feed.** Each account owns a Google spreadsheet (cloned
  from a template per category). The backend serves a per-account XML feed at
  `GET /xml/:accID` that Avito's autoload polls.
- **Ad randomization (spintax).** Title / Description / Price cells are generated
  from `*Random` template columns using a small templating language:
  - `[a, b, c]`: shuffle comma-separated items
  - `{a|b|c}`: pick one option at random
  - `<a|b|c>`: shuffle and join without a separator
  - `%Column%`: substitute another column's value for the current row
- **Auto-renewal.** Blocked ads (`renew_blocked`) and expired ads (`renew_old`)
  are re-published with a freshly minted 6-char id so Avito treats them as new.
- **Reports & stats.** Avito autoload reports (status, messages, end dates) and
  per-ad statistics (views / contacts / favorites / conversion over 1/7/30/270
  days) are fetched and written back into the sheet.
- **Photo hosting.** Image folders on Yandex.Disk are published and rewritten
  into spreadsheet-friendly links.
- **Billing.** Tinkoff payment init + callback, balance top-ups, tariff changes
  and renewals.

---

## Architecture

```
server/
  server.js                 Express app: CORS, logging, routes, error handling
  config/
    logger.js               Central log4js config (app / HTTP / JWT / CRON)
  routes/                   Express routers (users, accounts, specs, fields, services)
  controllers/              Request handlers (thin; delegate to services)
  middleware/
    validateToken.js        JWT auth + per-account/spec ownership checks
    requireCronSecret.js    Shared-secret guard for /cron/* endpoints
    validate.js             Lightweight body validators (requireFields/requireEmail)
    errorHandler.js         asyncHandler wrapper + 404 + central JSON error handler
  models/                   Mongoose schemas (User, Account, Spec, Field)
  services/
    Avito/                  Autoload auth, report + statistics loaders, settings
    Google/                 Sheets/Drive API, feed building, table read/write
    Yandex/                 OAuth token exchange, Disk folders, image links
    Payment/                Tinkoff init/token, balance transactions, tariffs
    Email/                  SendGrid verification / password-reset templates
    Randomizer/             Spintax expander + nanoid id minter
    Telegram/               Optional notification bot
    Date/                   Date helpers, timezone handling, account validation
    XML/                    Spreadsheet → Avito XML feed
    oneMinuteTableScripts.js  The per-minute sheet processing pass
    tableUtils.js           Pure helpers (transpose columns, longest column)
scripts/                    Ops helpers (container restart, placements generator)
tests/                      Vitest unit tests for the pure logic
```

The processing core is `server/services/Google/index.js`: it reads a spreadsheet
in COLUMNS form, pipes it through one or more callbacks (e.g. `loadAvitoReport`,
`loadAvitoStats`, or the one-minute pass), and writes only the allowed columns
back, so a user editing the sheet mid-run is never clobbered.

## Cron jobs (secured by `CRON_SECRET`)

These endpoints are triggered by an **external scheduler** (crontab / uptime
pinger), not by users. They are protected by `requireCronSecret`, which checks an
`x-cron-secret` header (or `?secret=` query param) against `process.env.CRON_SECRET`
and returns `401` otherwise.

| Endpoint | Frequency | Purpose |
| --- | --- | --- |
| `GET /cron/update_all_acc_values` | ~55 min | Cache active sheet data into `Google/tablesData` for fast XML serving |
| `GET /cron/start_load_avito_stat` | ~45 min | Load Avito autoload report, then statistics, back into the sheet |
| `GET /cron/start_one_minute_scripts` | 1 min | Run randomization, photo loading, stats aggregation, auto-renewal |
| `GET /cron/auto_renew_subscribtion` | daily | Charge balance and extend tariffs that are due |

Example trigger:

```bash
curl -H "x-cron-secret: $CRON_SECRET" https://your-host/cron/start_one_minute_scripts
```

## External integrations

- **Avito API** (`api.avito.ru`): client-credentials auth, autoload profile +
  reports, item statistics.
- **Google Sheets / Drive API**: spreadsheet provisioning from a template,
  reading/writing values, data validation. Authenticated with a **service-account
  key** at `server/services/Google/auth/auth.json`.
- **Yandex.Disk** (`cloud-api.yandex.net`): OAuth, folder management, photo
  publishing → public image links.
- **Tinkoff**: payment init + SHA-256 signed token, redirect callback.
- **SendGrid**: transactional email (verification, password reset).

## Data model (MongoDB / Mongoose)

- **User**: credentials (bcrypt), `balance`, email verification + reset tokens,
  Telegram link, embedded `transactions`.
- **Account**: owned by a user; Google `table_id`, Avito profile, Yandex token,
  `month_price`, `expire_at`, and `automatic` renewal flags.
- **Spec**: one category/sheet within an account; holds the per-sheet `stat`
  aggregate (totals, views/messages/likes over 1/7/30 days).
- **Field**: catalog of Avito categories and their tags/options used to build
  each new sheet.

## Environment setup

1. Copy the env template and fill in real values:
   ```bash
   cp .env.example .env
   ```
   Key variables: `DB_CONNECTION_STRING`, `JWT_SECRET` / `JWT_EXPIRES_IN`,
   `CRON_SECRET`, `YANDEX_CLIENT_ID/SECRET`, `TELEGRAM_BOT_TOKEN`,
   `TINKOFF_TERM_KEY/PASS`, `NET_ANGELS_TOKEN`, `SENDGRID_API_KEY`,
   `MANAGER_TABLE_EMAIL`, `TABLE_SAMPLE` / `SHEET_SAMPLE`.
2. Provide a Google service-account key. Use the shape in
   `server/services/Google/auth/auth.example.json` and save the real file as
   `server/services/Google/auth/auth.json` (git-ignored).

## Run & test

```bash
npm install         # install dependencies
npm start           # start the API (node server/server.js)
npm test            # run the Vitest unit suite
npm run test:watch  # watch mode
npm run lint        # eslint (airbnb-base)
```

The test suite covers the pure logic that is safe to isolate: the spintax
expander and Title/Description/Price randomization, the nanoid id minting, the
table transpose/parse helpers, and the placements generator.
