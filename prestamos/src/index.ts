import express from 'express'
import cors from 'cors'

import prestamosRouter from './routes/loans'
import sociosRouter from './routes/socios'

const PORT = 3000
const FRONTEND_PORT = 5173

const app = express()

app.use(express.json()) // middleware que transforma la req. body a un json

app.use(cors({ origin: `http://localhost:${FRONTEND_PORT}` }))

app.use('/api/loans', prestamosRouter)
app.use('/api/socios', sociosRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
