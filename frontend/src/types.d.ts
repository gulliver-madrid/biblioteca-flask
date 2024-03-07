interface Prestamo {
  id: number
  return_date: string
  id_user: number
  id_book: number
}

interface Socio {
  id: number
  user: string
}

interface Libro {
  id: number
  title: string
  autores: string
  date_added: string
}

interface Estado {
  prestamos?: Prestamo[]
  libros?: Libro[]
}

interface LibrosResponse {
  results: Libro[]
}

export { Libro, Estado, Socio, Prestamo }
export { LibrosResponse }
