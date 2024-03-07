import { useEffect, useState } from 'react'
import './App.css'
import { Estado } from './types'
import { BookList } from './components/BookList.tsx'
import { fetchData } from './services/fetchData.ts'
import { LoanList } from './components/LoanList.tsx'

function App(): JSX.Element {
  const [data, setData] = useState<Estado>({ prestamos: [], libros: [] })
  useEffect(() => {
    const update = async (): Promise<void> => {
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
          data.prestamos && data.socios ? (
            <div className="width-100vw">
              <BookList libros={data.libros} />
              <LoanList
                libros={data.libros}
                socios={data.socios}
                prestamos={data.prestamos}
              />
            </div>
          ) : (
            <p>Error: no se pudieron obtener los prestamos o los socios</p>
          )
        ) : (
          <p>Error: no se pudieron obtener los libros</p>
        )}
      </div>
    </>
  )
}

export default App
