import { getBookById } from '../services/getBookById'
import { Libro, Prestamo, Socio } from '../types'

const getBookTitleToDisplay = (libros: Libro[], prestamo: Prestamo): string =>
  getBookById(libros, prestamo.id_book)?.title || 'desconocido'

export const getLineaUsuarioText = (
  libros: Libro[],
  socios: Socio[],
  prestamo: Prestamo
): string => {
  const userId = prestamo.id_user
  const user = socios.find((socio) => socio.id === userId)
  const userName = user?.user || '<usuario no identificado>'
  const bookTitle = getBookTitleToDisplay(libros, prestamo)
  return `Usuario ${userName} con id ${userId} tiene prestado el libro ${bookTitle} con id ${prestamo.id_book}`
}
