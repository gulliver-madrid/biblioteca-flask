import express from 'express'

const router = express.Router()

router.get('/', (_, res) => {
  res.send('Viendo los usuarios y prestamos')
})

router.post('/', (_, res) => {
  res.send('Anadiendo un prestamo!')
})

export default router
