import { google } from 'googleapis';

// Provide your Google service-account key as ./server/service/auth/auth.json
// (copy auth.example.json -> auth.json). The real key is git-ignored.
export const auth = new google.auth.GoogleAuth({
  keyFile: './server/service/auth/auth.json',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://mail.google.com/',
  ],
});

export const SpreadsheetApp = google.sheets({
  version: 'v4',
  auth,
});

export const DriveApp = google.drive({ version: 'v3', auth });
