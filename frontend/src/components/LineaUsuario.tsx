import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'

const getBookTitleToDisplay = (libros: Libro[], prestamo: Prestamo) =>
  getBookById(libros, prestamo.id_book)?.title || 'desconocido'

const getLineaUsuarioText = (libros: Libro[], prestamo: Prestamo) => {
  const userName = prestamo.user || '<usuario no identificado>'
  const bookTitle = getBookTitleToDisplay(libros, prestamo)
  return `${userName} tiene prestado el libro con id ${prestamo.id_book}: ${bookTitle}`
}

export function LineaUsuario({ prestamo, libros }: Props) {
  return <li>{getLineaUsuarioText(libros, prestamo)}</li>
}

interface Props {
  prestamo: Prestamo
  libros: Libro[]
}
