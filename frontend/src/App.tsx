import { useEffect, useState } from 'react'
import './App.css'

const API_PRESTAMOS = 'http://localhost:3000/api/loans'
const API_CATALOGO = 'http://localhost:7001/api/libros'

interface Prestamo {
  id: number
  // nombre: string;
  // otros campos relevantes
}

interface Libro {
  id: number
  // titulo: string;
  // autor: string;
  // otros campos relevantes
}

interface Estado {
  prestamos: Prestamo[]
  libros: Libro[]
}

function App() {
  const [data, setData] = useState<Estado>({ prestamos: [], libros: [] })
  async function fetchData(): Promise<void> {
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
    setData({ prestamos, libros })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <h1>Biblioteca</h1>
      <div className="card">
        <p>Te damos la bienvenida a nuestra biblioteca</p>
        <p>prestamos: {JSON.stringify(data.prestamos)}</p>
        <p>libros: {JSON.stringify(data.libros)}</p>
      </div>
    </>
  )
}

export default App
