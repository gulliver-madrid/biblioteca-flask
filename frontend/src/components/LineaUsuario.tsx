import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'

export function LineaUsuario({ prestamo, libros }: LineaUsuarioProps) {
  return (
    <li>
      {prestamo.user || '<usuario no identificado>'} tiene prestado el libro con
      id {prestamo.id_book}:{' '}
      {getBookById(libros, prestamo.id_book)?.title || 'desconocido'}
    </li>
  )
}

interface LineaUsuarioProps {
  prestamo: Prestamo
  libros: Libro[]
}
