import { Libro, Prestamo, Socio } from '../types'
import { LineaUsuario } from './LineaUsuario'
import './LoanList.css'

export function LoanList({ prestamos, socios, libros }: Props): JSX.Element {
  return (
    <div className="loan-list">
      <h3 className="align-left">Socios con libros prestados:</h3>
      <ol>
        {prestamos.map((prestamo) => (
          <LineaUsuario
            key={prestamo.id}
            prestamo={prestamo}
            socios={socios}
            libros={libros}
          />
        ))}
      </ol>
    </div>
  )
}

interface Props {
  libros: Libro[]
  socios: Socio[]
  prestamos: Prestamo[]
}
