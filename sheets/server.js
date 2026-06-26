import express from 'express'
import xml from './readNxml/index.js'

const app = express()
const port = 53353

app.use(express.json())
app.listen(port, () => console.log(`Server started on port ${port}`))

// Reads a Google Spreadsheet and returns it as an Avito autoload XML feed.
// Convention: row 1 = XML tag name, rows 3+ = values (row 2 is a human label, skipped).
app.get('/data', async (req, res) => {
  const sheetID = req.query.id
  const result = await xml(sheetID)
  console.log(result)
  res
    .status(200)
    .send(result)
})
