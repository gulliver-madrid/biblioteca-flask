import { Libro } from '../types'
import './BookList.css'

export function BookList({ libros }: Props): JSX.Element {
  return (
    <div className="book-list">
      <h3 className="align-left">Libros:</h3>
      <ol>
        {libros.map((libro) => (
          <li key={libro.id}>
            {libro.title} (id {libro.id})
          </li>
        ))}
      </ol>
    </div>
  )
}

interface Props {
  libros: Libro[]
}
