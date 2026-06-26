# Google service-account key

The Google service connects to Google Sheets and Google Drive using a
**service-account key**. The real key (`auth.json`) is intentionally **not**
included in this repository.

## Setup

1. Create a service account in the Google Cloud Console and grant it access to
   the Sheets and Drive APIs.
2. Download its JSON key.
3. Copy `auth.example.json` to `auth.json` in this directory and replace the
   placeholder values with the contents of your downloaded key:

   ```bash
   cp auth.example.json auth.json
   ```

`auth.json` is git-ignored and must never be committed.
