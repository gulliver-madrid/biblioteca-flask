import { getLineaUsuarioText } from '../services/presenterLineaUsuario'
import { Libro, Prestamo } from '../types'

export function LineaUsuario({ prestamo, libros }: Props): JSX.Element {
  return <li>{getLineaUsuarioText(libros, prestamo)}</li>
}

interface Props {
  prestamo: Prestamo
  libros: Libro[]
}
