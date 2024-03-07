import { Libro, Prestamo } from '../types'
import { LineaUsuario } from './LineaUsuario'
import './LoanList.css'

export function LoanList({ prestamos, libros }: Props): JSX.Element {
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
