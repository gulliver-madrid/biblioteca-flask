import { getBookById } from '../services/getBookById'
import { Libro, Prestamo } from '../types'
import './LoanList.css'

export function LoanList({ prestamos, libros }: Props) {
  return (
    <div className="loan-list">
      <h3 className="align-left">Socios con libros prestados:</h3>
      <ol>
        {prestamos.map((prestamo) => (
          <li key={prestamo.id}>
            {prestamo.user} tiene prestado el libro con id {prestamo.id}:{' '}
            {getBookById(libros, prestamo.id_book)?.title || 'desconocido'}
          </li>
        ))}
      </ol>
    </div>
  )
}

interface Props {
  libros: Libro[]
  prestamos: Prestamo[]
}
