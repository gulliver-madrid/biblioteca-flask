import {
  assertIsLibrosResponse,
  assertIsPrestamoArray,
  assertIsSocioArray,
} from '../assertTypes'
import { Estado, Libro, Prestamo, Socio } from '../types'

const API_PRESTAMOS = 'http://localhost:3000/api/loans'
const API_SOCIOS = 'http://localhost:3000/api/socios'
const API_CATALOGO = 'http://localhost:7001/api/libros'

export async function fetchLibros(): Promise<Libro[]> {
  const responseLibros = await fetch(API_CATALOGO)
  if (!responseLibros.ok) {
    throw new Error('Error al recuperar los libros')
  }
  const libros: unknown = await responseLibros.json()
  assertIsLibrosResponse(libros)
  return libros.results
}

export async function fetchPrestamos(): Promise<Prestamo[]> {
  const responsePrestamos = await fetch(API_PRESTAMOS)
  if (!responsePrestamos.ok) {
    throw new Error('Error al recuperar los préstamos')
  }
  const prestamos: unknown = await responsePrestamos.json()
  assertIsPrestamoArray(prestamos)
  return prestamos
}
export async function fetchSocios(): Promise<Socio[]> {
  const responseSocios = await fetch(API_SOCIOS)
  if (!responseSocios.ok) {
    throw new Error('Error al recuperar los socios')
  }
  const socios: unknown = await responseSocios.json()
  assertIsSocioArray(socios)
  return socios
}

export async function fetchData(): Promise<Estado> {
  let prestamos
  let libros
  let socios
  try {
    const prestamosPromise = fetchPrestamos()
    const sociosPromise = fetchSocios()
    const librosPromise = fetchLibros()
    prestamos = await prestamosPromise
    socios = await sociosPromise
    libros = await librosPromise
  } catch (error) {
    console.error('Hubo un error en la solicitud:', error)
  }
  return { prestamos, socios, libros }
}
