import express from 'express'
import { getPrestamos } from '../services/loans'

const router = express.Router()

router.get('/', (_, res) => {
  res.send(getPrestamos())
})

router.post('/', (_, res) => {
  res.send('Anadiendo un prestamo!')
})

export default router
