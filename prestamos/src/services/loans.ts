import { PrestamoEntry } from '../types'
import prestamosData from './loansData.json' // needs resolveJsonModule

export const getPrestamos = (): PrestamoEntry[] => prestamosData

export const addPrestamo = () => null
