import express from 'express'
import { getSocios } from '../services/socios'

const router = express.Router()

router.get('/', (_, res) => {
  res.send(getSocios())
})



export default router
