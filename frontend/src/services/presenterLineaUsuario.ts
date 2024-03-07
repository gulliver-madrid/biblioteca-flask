import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'

const getBookTitleToDisplay = (libros: Libro[], prestamo: Prestamo): string =>
  getBookById(libros, prestamo.id_book)?.title || 'desconocido'

export const getLineaUsuarioText = (
  libros: Libro[],
  prestamo: Prestamo
): string => {
  const userId = prestamo.id_user || '<usuario no identificado>'
  const bookTitle = getBookTitleToDisplay(libros, prestamo)
  return `Usuario con id ${userId} tiene prestado el libro con id ${prestamo.id_book}: ${bookTitle}`
}
