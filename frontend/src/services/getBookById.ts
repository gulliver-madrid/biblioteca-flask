import { Libro } from '../types'

export function getBookById(libros: Libro[], id: number): Libro | undefined {
  for (const libro of libros) {
    if (libro.id === id) {
      return libro
    }
  }
}
