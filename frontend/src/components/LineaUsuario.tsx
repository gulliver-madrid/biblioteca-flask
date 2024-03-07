import { getLineaUsuarioText } from '../services/presenterLineaUsuario'
import { Libro, Prestamo, Socio } from '../types'

export function LineaUsuario({ prestamo, socios, libros }: Props): JSX.Element {
  const text = getLineaUsuarioText(libros, socios, prestamo)
  return <li>{text}</li>
}

interface Props {
  prestamo: Prestamo
  socios: Socio[]
  libros: Libro[]
}
