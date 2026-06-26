import { google } from 'googleapis';

export const auth = new google.auth.GoogleAuth({
  keyFile: './server/services/Google/auth/auth.json',
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
