import express from 'express'

import prestamosRouter from './routes/loans'

const PORT = 3000

const app = express()

app.use(express.json()) // middleware que transforma la req. body a un json

app.use('/api/loans', prestamosRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
