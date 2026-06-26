# Avito Plus: Infrastructure & Microservices

Deployment and source layout for **Avito Plus**, a SaaS that automates posting and
managing classified ads on Avito (Russian marketplace) via Avito's autoload (XML
feed) API. This folder is the sanitized infrastructure slice of the project: all
live secrets, credential files and database dumps have been removed.

> Sanitized for public showcase. No real keys, tokens, customer data or live
> domains are included. Replace every placeholder before running.

> **Note:** `infra/` vendors the pre-refactor service source as each container's Docker build context, so its code overlaps the standalone `backend/` module.

## Architecture

A Docker Compose stack of small single-responsibility Node.js (Express) services
behind an Nginx TLS gateway, with MongoDB for persistence.

```
                         ┌──────────────────────────┐
        Internet ──443──▶│   nginx (TLS gateway)     │
                         │   proxies → validator     │
                         └────────────┬─────────────┘
                                      │
                              ┌───────▼────────┐
                              │   validator    │  API gateway / auth middleware
                              │  (port 3000)   │  routes to internal services
                              └───────┬────────┘
        ┌──────────┬──────────┬───────┼────────┬──────────┬──────────┐
        ▼          ▼          ▼       ▼        ▼          ▼          ▼
      auth       avito      google  mongo-   email     tinkoff    yandex
   (JWT auth) (autoload/  (Sheets/ server   (SendGrid (payments) (Yandex
              reports)    Drive +  (Mongo   email)               Disk
                          XML gen) data API)                     images)
                                      │
                                ┌─────▼─────┐
                                │ mongo-db  │  MongoDB 4.4
                                └───────────┘
        cron  ── schedules recurring jobs (one-minute scripts, stats, renewals)
        dozzle ── container log viewer (ops only)
```

### Services

| Service        | Role |
|----------------|------|
| **nginx**      | TLS termination + reverse proxy. All public traffic enters here and is proxied to `validator`. |
| **validator**  | Public API gateway. Validates JWTs / account ownership (see `server/middleware/validateToken.js`) and forwards requests to internal services. The only service Nginx talks to. |
| **auth**       | Registration, email verification, login (JWT issuance), password recovery. |
| **avito**      | Talks to the Avito autoload API: pulls upload reports and ad statistics, formats them for the Google Sheet. |
| **google**     | Google Sheets / Drive integration: creates per-account spreadsheets, runs the "one-minute scripts" that drive the ad lifecycle, and generates the Avito XML feed. |
| **yandex**     | Yandex Disk integration: uploads/publishes ad images and returns public image URLs. |
| **email**      | Transactional email via SendGrid (account confirmation, password recovery). |
| **tinkoff**    | Tinkoff payments: plan top-ups, renewals, webhook handling, transaction history. |
| **mongo-server** | Thin data-access API over MongoDB (users, accounts, specs, fields, tasks). |
| **mongo-db**   | MongoDB 4.4 instance (data volume is git-ignored and never published). |
| **cron**       | Schedules recurring jobs across valid accounts (one-minute scripts, stats save, renewals). |
| **dozzle**     | Web log viewer for the running containers (operations only). |

Internal services discover each other by Docker service name (see the `*_HOST`
variables in `.env.example`).

## Prerequisites

- Docker + Docker Compose
- A Google Cloud **service account** key (Sheets + Drive APIs)
- A TLS certificate + key for your domain
- A SendGrid API key, Tinkoff terminal credentials, and Yandex OAuth credentials

## Configuration

1. **Environment**: copy the example env file and fill in real values:

   ```bash
   cp .env.example .env
   ```

   `.env` is git-ignored. At minimum set the Mongo credentials
   (`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`, `MONGO_URL`),
   `JWT_SECRET`, `SENDGRID_API_KEY`, the Tinkoff and Yandex credentials, and the
   Google Sheets template ids.

2. **Google service account**: drop your key in place of the template:

   ```bash
   cp Google/server/service/auth/auth.example.json Google/server/service/auth/auth.json
   ```

   Then paste your downloaded key contents into `auth.json`
   (see `Google/server/service/auth/README.md`). `auth.json` is git-ignored.

3. **TLS certificate**: provide your own cert + key for Nginx. Place them in
   `Nginx/ssl/` and update the filenames in `Nginx/configs/default.conf`
   (the config references `your-domain.example.full.crt` /
   `your-domain.example.key`). Also replace `your-domain.example` with your real
   domain in that file.

## Running

Production (TLS gateway, no host port mapping for internal services):

```bash
docker compose build
docker compose --compatibility up
```

Local development (each service is published on its own host port from `.env`,
Nginx/TLS is not required):

```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

Convenience targets live in the `Makefile` (`make docker-build-prod`,
`make docker-build-dev`, `make docker-logs`, `make docker-stats`).

## What was removed for the public version

- MongoDB data dumps (`data/`, `Mongo/data/`), contained real OAuth tokens and PII
- The live Google service-account key (`auth.json`)
- The live `.env` (JWT, SendGrid, Mongo, Tinkoff, Yandex secrets)
- TLS certificates / private keys
- Real listing fixtures and exported table/XML/report data
- All references to the real production domain (replaced with `your-domain.example`)
