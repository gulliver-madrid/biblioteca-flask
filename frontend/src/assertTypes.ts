import { LibrosResponse } from './types'

export function assertIsLibrosResponse(
  obj: unknown
): asserts obj is LibrosResponse {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object')
  }
  if (!('results' in obj) || !Array.isArray(obj.results)) {
    throw new Error('Object does not match the LibrosResponse interface')
  }
}
