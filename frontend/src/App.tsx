import { useEffect, useState } from 'react'
import './App.css'
import { Estado } from './types'
import { BookList } from './components/BookList.tsx'
import { fetchData } from './services/fetchData.ts'
import { LoanList } from './components/LoanList.tsx'

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
        {data.libros ? (
          <div className="width-100vw">
            <BookList libros={data.libros} />
            <LoanList libros={data.libros} prestamos={data.prestamos} />
          </div>
        ) : (
          <p>Error: no se encontraron los libros</p>
        )}
      </div>
    </>
  )
}

export default App
