interface PrestamoEntry {
  id: number
  return_date: string
  id_user: number
  id_book: number
}

interface Socio {
  id: number
  user: string
}

interface Prestamo {
  id: number
  user: string
  id_book: number
}

interface Libro {
  id: number
  title: string
  autores: string
  date_added: string
}

interface Estado {
  prestamos: Prestamo[]
  libros: Libro[]
}

interface LibrosResponse {
  results: Libro[]
}

export function assertIsLibrosResponse(
  obj: unknown
): asserts obj is LibrosResponse {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object')
  }
  if (
    !Object.prototype.hasOwnProperty.call(obj, 'results') ||
    !Array.isArray(obj.results)
  ) {
    throw new Error('Object does not match the LibrosResponse interface')
  }
}

export { Prestamo, Libro, Estado, Socio, PrestamoEntry }
export type { LibrosResponse }
