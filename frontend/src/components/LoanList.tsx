import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'
import './LoanList.css'

export function LoanList({ prestamos, libros }: Props) {
  return (
    <div className="loan-list">
      <h3 className="align-left">Socios con libros prestados:</h3>
      <ol>
        {prestamos.map((prestamo) => (
          <LineaUsuario key={prestamo.id} prestamo={prestamo} libros={libros} />
        ))}
      </ol>
    </div>
  )
}

interface Props {
  libros: Libro[]
  prestamos: Prestamo[]
}

function LineaUsuario({ prestamo, libros }: LineaUsuarioProps) {
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
