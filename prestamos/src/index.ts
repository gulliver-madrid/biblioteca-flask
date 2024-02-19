import express from 'express'

const PORT = 3000

const app = express()

app.use(express.json()) // middleware que transforma la req. body a un json

app.get('/ping', (_, res) => {
  console.log('someone pinged here!')
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
