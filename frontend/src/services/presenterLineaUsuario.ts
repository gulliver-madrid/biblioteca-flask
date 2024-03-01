import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'

const getBookTitleToDisplay = (libros: Libro[], prestamo: Prestamo) =>
  getBookById(libros, prestamo.id_book)?.title || 'desconocido'

export const getLineaUsuarioText = (libros: Libro[], prestamo: Prestamo) => {
  const userName = prestamo.user || '<usuario no identificado>'
  const bookTitle = getBookTitleToDisplay(libros, prestamo)
  return `${userName} tiene prestado el libro con id ${prestamo.id_book}: ${bookTitle}`
}
