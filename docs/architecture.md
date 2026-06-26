# Architecture

Avito Plus is a small platform of independent Node services around one idea: **a Google Sheet is the database and control surface for a seller's classified ads.** Everything else exists to keep that sheet and the marketplace in sync.

## Components

| Component | Role |
|---|---|
| `backend/` | The API + the cron automation engine. Express + MongoDB (Mongoose). Owns accounts, auth (JWT + bcrypt), tariffs, payments, and the scheduled jobs that renew ads and sync stats. |
| `sheets/` | A tiny Express service that turns a spreadsheet into the marketplace **autoload XML** feed (`GET /data?id=<spreadsheetId>`). |
| `web/` | The React/Vite seller dashboard (register, connect accounts, link a Yandex token, manage tariffs/payments). |
| `infra/` | Docker Compose: nginx gateway + the Node services + MongoDB. |

## The sheet convention

Each ad is a **column**. Within a column:

- **row 1**: the marketplace XML tag name (`Title`, `Description`, `Price`, `Images`, ...)
- **row 2**: a human label
- **rows 3+**: the values / spintax templates

The `sheets` service reads every tab via the Google Sheets API, transposes columns → objects, and emits the autoload XML the marketplace ingests. No intermediate database for the ad content: the sheet *is* the content.

## The cron engine (`backend`)

Four scheduled endpoints (all behind `CRON_SECRET`):

| Endpoint | Job |
|---|---|
| `POST /cron/start_load_avito_stat` | Pull the marketplace report + stats (views / contacts / favourites over 1 / 7 / 30 days) and write them back into each account's sheet. |
| `POST /cron/start_one_minute_scripts` | The renewal engine: detect `Blocked` / `Expired` ads, mint a fresh `nanoid` id, refresh begin/end dates, re-randomize Title/Description/Price from templates, resolve Yandex.Disk image folders to direct links. |
| `POST /cron/update_all_acc_values` | Refresh per-account derived values. |
| `POST /cron/auto_renew_subscribtion` | Tariff/subscription lifecycle. |

These are triggered by an external scheduler (e.g. cron + `curl` with the secret header).

## Integrations

- **Avito API**: OAuth `client_credentials` per account → autoload reports + statistics endpoints.
- **Google**: a service account reads/writes each user's spreadsheet (Sheets + Drive scopes).
- **Yandex.Disk**: image-folder columns resolve to direct image URLs at feed time.
- **Tinkoff**: payment initialization for tariffs.
- **SendGrid**: transactional email (verification, password reset).

## Key design decisions

- **Sheet-as-database.** Sellers already live in spreadsheets; making the sheet the source of truth removes a whole CRUD UI and lets non-technical users self-serve. The trade-off (no strong schema) is contained in the `sheets` transpose layer.
- **Spintax re-randomization on renewal.** Re-posting an identical ad gets it flagged as a duplicate; regenerating copy from templates each cycle keeps renewed listings unique.
- **Stateless renewal via fresh ids.** Rather than mutating a blocked ad, the engine mints a new id and refreshed dates, idempotent and resilient to partial failures.
- **Secret-gated automation.** The cron surface is unauthenticated by nature (machine-triggered), so it's protected by a shared `CRON_SECRET` rather than user JWTs.

## Security & secrets

No real credentials ship in this repo. Every secret is a placeholder: `.env.example` per service and `auth.example.json` for the Google service account. Provide your own keys to run it.
