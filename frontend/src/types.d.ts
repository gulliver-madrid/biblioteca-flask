interface Prestamo {
  id: number
  user: string
  id_book: number
}

interface Libro {
  id: number
  title: string
}

interface Estado {
  prestamos: Prestamo[]
  libros: Libro[]
}

export { Prestamo, Libro, Estado }
