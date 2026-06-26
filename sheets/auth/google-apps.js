import { google } from 'googleapis'

export const auth = new google.auth.GoogleAuth({
  keyFile: './auth/auth.json',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ]
})

export const SpreadsheetApp = google.sheets({
  version: 'v4',
  auth
})
export const DriveApp = google.drive({ version: 'v3', auth })
