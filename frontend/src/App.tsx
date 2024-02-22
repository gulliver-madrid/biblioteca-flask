import { useEffect } from 'react'
import './App.css'

async function fetchData() {
  try {
    // Recuperar la lista de prestamos
    const responsePrestamos = await fetch('http://localhost:3000/api/loans');
    if (!responsePrestamos.ok) {
    console.log("error prestamos");
      throw new Error('Error al recuperar los préstamos');
    }
    const prestamos = await responsePrestamos.json();
    console.log('Préstamos:', prestamos);

    // Recuperar la lista de libros
    const responseLibros = await fetch('http://localhost:7001/api/libros');
    if (!responseLibros.ok) {
    console.log("error libros");
      throw new Error('Error al recuperar los libros');
    }
    const libros = await responseLibros.json();
    console.log('Libros:', libros);
  } catch (error) {
    console.error('Hubo un error en la solicitud:', error);
  }
}



function App() {
  useEffect(()=>{
    fetchData()
  })
  return (
    <>
      <h1>Biblioteca</h1>
      <div className="card">
        <p>
          Te damos la bienvenida a nuestra biblioteca
        </p>
      </div>
    </>
  )
}

export default App
