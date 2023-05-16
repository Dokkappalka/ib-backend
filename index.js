const express = require('express')
const app = express()
const XLSX = require('xlsx')
const PORT = 4000
const https = require('https')
const cors = require('cors')

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)

const db = XLSX.readFile('./vullist.xlsx')
const parse = () => {
  return Object.keys(db.Sheets).map((name) => ({
    name,
    data: XLSX.utils.sheet_to_json(db.Sheets[name]),
  }))
}

fData = parse()

app.get('/api/codes', (req, res) => {
  const result = fData[0].data.reduce((acc, item) => {
    if (acc.includes(item['Тип ошибки CWE'])) {
      return acc
    }
    return [...acc, item['Тип ошибки CWE']]
  }, [])
  res.json(result)
})

app.get('/api/byProblem', (req, res) => {
  const code = req.query.code
  const result = fData[0].data.reduce((acc, item) => {
    if (item['Тип ошибки CWE'] == code) {
      return [...acc, item]
    }
    return acc
  }, [])
  res.json(result)
})

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
