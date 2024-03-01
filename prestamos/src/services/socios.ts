import { SocioEntry } from '../types'
import sociosData from './sociosData.json' // needs resolveJsonModule

export const getSocios = (): SocioEntry[] => sociosData
