interface PrestamoEntry {
  id: number
  return_date: string
  id_user: number
  id_book: number
}

interface Socio {
  id: number
  user: string
}

interface Prestamo {
  id: number
  user: string
  id_book: number
}

interface Libro {
  id: number;
  title: string;
  autores: string;
  date_added: string;
}

interface Estado {
  prestamos: Prestamo[]
  libros: Libro[]
}

interface LibrosResponse {
  results: Libro[];
}

export { Prestamo, Libro, Estado, Socio, PrestamoEntry }
export type { LibrosResponse }
