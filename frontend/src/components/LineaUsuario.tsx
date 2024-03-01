import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'

export function LineaUsuario({ prestamo, libros }: LineaUsuarioProps) {
  const userName = prestamo.user || '<usuario no identificado>'
  const bookTitle =
    getBookById(libros, prestamo.id_book)?.title || 'desconocido'
  return (
    <li>
      {userName} tiene prestado el libro con id {prestamo.id_book}: {bookTitle}
    </li>
  )
}

interface LineaUsuarioProps {
  prestamo: Prestamo
  libros: Libro[]
}
