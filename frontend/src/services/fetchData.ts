import { Estado } from '../types'

const API_PRESTAMOS = 'http://localhost:3000/api/loans'
const API_CATALOGO = 'http://localhost:7001/api/libros'

export async function fetchData(): Promise<Estado> {
  let prestamos = null
  let libros = null
  try {
    // Recuperar la lista de prestamos
    const responsePrestamos = await fetch(API_PRESTAMOS)
    if (!responsePrestamos.ok) {
      throw new Error('Error al recuperar los préstamos')
    }
    prestamos = await responsePrestamos.json()

    // Recuperar la lista de libros
    const responseLibros = await fetch(API_CATALOGO)
    if (!responseLibros.ok) {
      throw new Error('Error al recuperar los libros')
    }
    libros = await responseLibros.json()
  } catch (error) {
    console.error('Hubo un error en la solicitud:', error)
  }
  return { prestamos, libros: libros.results }
}
export { API_CATALOGO, API_PRESTAMOS }
