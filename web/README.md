# Avito Plus: Web UI

Single-page web application (SPA) for **Avito Plus**, a SaaS that automates listing management and ad duplication for sellers on the Avito marketplace.

## What the UI does

- **Register / log in**: account creation, sign-in, password reset and change flows.
- **Connect ad accounts**: add, edit and archive Avito ad accounts, manage their categories and add-ons.
- **Link Yandex token**: connect a Yandex token so the service can act on the user's behalf.
- **Manage tariffs & payments**: view and extend tariffs, configure payment settings, and review account/transaction tables.
- **Drive ad duplication via Google Sheets**: build and edit listing "slides" (specs, images, descriptions) that are duplicated across accounts, backed by Google Sheets.

## Stack

- **React 18** + **Vite** (SPA)
- **Chakra UI** + Emotion + Framer Motion
- **Redux Toolkit** + redux-persist
- **React Router**, **Formik** + **Yup**, **Axios**

## Environment

Configure the API base URL via an environment variable (see `.env.example`):

```
VITE_API_URL=https://your-api.example
```

## Build & run

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (HMR)
npm run build    # production build into dist/
npm run preview  # preview the production build
```
