import { Estado } from '../types'

const API_PRESTAMOS = 'http://localhost:3000/api/loans'
const API_CATALOGO = 'http://localhost:7001/api/libros'

export async function fetchLibros() {
  const responseLibros = await fetch(API_CATALOGO)
  if (!responseLibros.ok) {
    throw new Error('Error al recuperar los libros')
  }
  const libros = await responseLibros.json()
  return libros.results
}

export async function fetchData(): Promise<Estado> {
  let prestamos = null
  let libros = null
  try {
    const responsePrestamos = await fetch(API_PRESTAMOS)
    if (!responsePrestamos.ok) {
      throw new Error('Error al recuperar los préstamos')
    }
    prestamos = await responsePrestamos.json()
    libros = await fetchLibros()
  } catch (error) {
    console.error('Hubo un error en la solicitud:', error)
  }
  return { prestamos, libros }
}

export { API_CATALOGO, API_PRESTAMOS }
