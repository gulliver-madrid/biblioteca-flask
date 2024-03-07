import {
  assertIsLibrosResponse,
  assertIsPrestamoArray,
  assertIsSocioArray,
} from '../assertTypes'
import { Estado, Libro, Prestamo, Socio } from '../types'

const API_PRESTAMOS = 'http://localhost:3000/api/loans'
const API_SOCIOS = 'http://localhost:3000/api/socios'
const API_CATALOGO = 'http://localhost:7001/api/libros'

async function validate_get_response(
  response: Response,
  dataDescription: string
): Promise<unknown> {
  if (!response.ok) {
    throw new Error(`Error al recuperar ${dataDescription}`)
  }
  return await response.json()
}

export async function fetchLibros(): Promise<Libro[]> {
  const response = await fetch(API_CATALOGO)
  const libros = await validate_get_response(response, 'los libros')
  assertIsLibrosResponse(libros)
  return libros.results
}

export async function fetchPrestamos(): Promise<Prestamo[]> {
  const response = await fetch(API_PRESTAMOS)
  const prestamos = await validate_get_response(response, 'los préstamos')
  assertIsPrestamoArray(prestamos)
  return prestamos
}

export async function fetchSocios(): Promise<Socio[]> {
  const response = await fetch(API_SOCIOS)
  const socios = await validate_get_response(response, 'los socios')
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
