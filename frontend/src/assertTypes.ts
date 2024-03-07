import { LibrosResponse, Prestamo, Libro, Socio } from './types'

export function assertIsLibro(obj: unknown): asserts obj is Libro {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object')
  }
  if (
    !('id' in obj) ||
    !('title' in obj) ||
    !('autores' in obj) ||
    !('date_added' in obj)
  ) {
    throw new Error('Object is missing properties to be a Prestamo')
  }
  if (
    typeof obj.id !== 'number' ||
    typeof obj.title !== 'string' ||
    typeof obj.autores !== 'string' ||
    typeof obj.date_added !== 'string'
  ) {
    throw new Error(
      'Type of object properties do not match the Libro interface'
    )
  }
}

export function assertIsLibrosResponse(
  obj: unknown
): asserts obj is LibrosResponse {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object')
  }
  if (!('results' in obj) || !Array.isArray(obj.results)) {
    throw new Error('Object does not match the LibrosResponse interface')
  }
  for (const libro of obj.results) {
    assertIsLibro(libro)
  }
}

export function assertIsPrestamo(obj: unknown): asserts obj is Prestamo {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object')
  }
  if (
    !('id' in obj) ||
    !('return_date' in obj) ||
    !('id_user' in obj) ||
    !('id_book' in obj)
  ) {
    throw new Error('Object is missing properties to be a Prestamo')
  }
  if (
    typeof obj.id !== 'number' ||
    typeof obj.return_date !== 'string' ||
    typeof obj.id_user !== 'number' ||
    typeof obj.id_book !== 'number'
  ) {
    throw new Error(
      'Type of object properties do not match the Prestamo interface'
    )
  }
}

export function assertIsPrestamoArray(obj: unknown): asserts obj is Prestamo[] {
  if (!Array.isArray(obj)) {
    throw new Error(`Object is not an array: ${obj}`)
  }
  for (const prestamo of obj) {
    assertIsPrestamo(prestamo)
  }
}

export function assertIsSocio(obj: unknown): asserts obj is Socio {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object')
  }
  if (!('id' in obj) || !('user' in obj)) {
    throw new Error('Object is missing properties to be a Socio')
  }
  if (typeof obj.id !== 'number' || typeof obj.user !== 'string') {
    throw new Error(
      'Type of object properties do not match the Socio interface'
    )
  }
}

export function assertIsSocioArray(obj: unknown): asserts obj is Socio[] {
  if (!Array.isArray(obj)) {
    throw new Error('Object is not an array')
  }
  for (const socio of obj) {
    assertIsSocio(socio)
  }
}
