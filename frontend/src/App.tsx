import { useEffect, useState } from 'react'
import './App.css'
import { Estado, Libro } from './types'
import { BookList } from './components/Libro'
import { fetchData } from './services/fetchData.ts'

function getLibroById(libros: Libro[], id: number): Libro | undefined {
  for (const libro of libros) {
    if (libro.id === id) {
      return libro
    }
  }
}

function App() {
  const [data, setData] = useState<Estado>({ prestamos: [], libros: [] })
  useEffect(() => {
    const update = async () => {
      const newData = await fetchData()
      setData(newData)
    }
    update()
  }, [])
  return (
    <>
      <h1>Biblioteca</h1>
      <div className="card">
        <p>Te damos la bienvenida a nuestra biblioteca</p>
        <div className="width-100vw">
          <BookList libros={data.libros} />
          <h3 className="align-left">Socios con libros prestados:</h3>
          <ol>
            {data.prestamos.map((prestamo) => (
              <li key={prestamo.id}>
                {prestamo.user} tiene prestado el libro con id {prestamo.id}:{' '}
                {getLibroById(data.libros, prestamo.id_book)?.title ||
                  'desconocido'}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}

export default App
