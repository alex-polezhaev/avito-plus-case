# sheets: Google Sheets → Avito XML feed engine

A small Express service that turns an ordinary **Google Spreadsheet into a database**
and serves it as an [Avito autoload](https://autoload.avito.ru/) XML feed.

Marketplace sellers maintain their listings in a spreadsheet (a familiar, multi-user,
zero-deploy editor); this service reads that spreadsheet live via the Google Sheets API
and transposes it into the exact XML shape Avito's autoload expects. No database,
no admin panel: the sheet *is* the CMS.

## The core idea

Each **column** of the spreadsheet is one field of an ad. Each **data row** is one listing.

| Row    | Role                | Example          |
|--------|---------------------|------------------|
| Row 1  | XML tag name        | `Title`          |
| Row 2  | Human-readable label (ignored by the engine) | `Ad title` |
| Row 3+ | Values: one row per ad | `Rolex Submariner` |

So a sheet laid out like this:

```
Id       | Title              | Price   | Category
(label)  | (label)            | (label) | (label)
101      | Rolex Submariner   | 950000  | Watches
102      | Omega Speedmaster  | 320000  | Watches
```

is transformed into one `<Ad>` record per row:

```xml
<Id>101</Id><Title>Rolex Submariner</Title><Price>950000</Price><Category>Watches</Category>
<Id>102</Id><Title>Omega Speedmaster</Title><Price>320000</Price><Category>Watches</Category>
```

The transform is a pure **column → tag, row → record** transpose, done with two
`lodash` zips (see below). Multiple sheet tabs in the same spreadsheet are concatenated,
so you can split a large catalog across tabs.

## The transform, step by step

`readNxml/` is the engine:

1. **`getValues.js`**: calls the Sheets API:
   - `spreadsheets.get` to list every tab (sheet) title;
   - `spreadsheets.values.batchGet` to pull all values from those tabs;
   - `_.zip(...values)` transposes each tab so every **column becomes an array**
     whose element `[0]` is the row-1 tag, `[1]` is the row-2 label, and `[2..]` are the values;
   - all tabs are flattened into a single list of columns.
2. **`xml.js`**: `createXMLfeed`:
   - for each column array, reads the tag from element `[0]`;
   - wraps every value at index `>= 2` as `<tag>value</tag>` (rows 1 and 2 are skipped);
   - `_.unzip(...)` transposes back, regrouping the per-field snippets into
     **per-record** arrays, one entry per original data row.
3. **`index.js`**: composes the two: `getValues → createXMLfeed → XML`.

## HTTP API

### `GET /data?id=<spreadsheetId>`

Reads the Google Spreadsheet with the given ID and returns the generated feed.

```
GET http://localhost:53353/data?id=1AbC...your-spreadsheet-id
```

`<spreadsheetId>` is the long token in the spreadsheet URL:
`https://docs.google.com/spreadsheets/d/`**`<spreadsheetId>`**`/edit`.

The server listens on port **53353**.

## Setup

This service authenticates to Google with a **service account** (server-to-server,
no interactive OAuth).

1. **Create a GCP project** and enable the **Google Sheets API** and **Google Drive API**.
2. **Create a service account** and download its JSON key.
   Save it as `auth/auth.json` (git-ignored). Use `auth/auth.example.json` as the shape reference.
3. **Share each spreadsheet** with the service account's `client_email`
   (Viewer is enough for `/data`) so it can read the data.
4. Install and run:

   ```bash
   npm install
   node server.js
   ```

   Then open `http://localhost:53353/data?id=<spreadsheetId>`.

The Sheets/Drive clients are configured in `auth/google-apps.js`.

## Project layout

```
server.js                  Express app - the /data route
auth/
  google-apps.js           Google Sheets + Drive API clients (service-account auth)
  auth.example.json        Placeholder service-account key (real key is git-ignored)
readNxml/
  index.js                 Pipeline: getValues → createXMLfeed
  getValues.js             Sheets API read + column transpose
  xml.js                   Per-column tagging + record regroup
```

## Notes

- The real service-account key (`auth/auth.json`) is **never** committed. It stays local
  and git-ignored. Only the placeholder `auth.example.json` is published.
- The original codebase had an extra `/new_sheet` route that programmatically created and
  shared new spreadsheets; its helper modules are not part of this showcase, so the route
  was removed to keep the engine focused on the elegant read-and-transform core.
