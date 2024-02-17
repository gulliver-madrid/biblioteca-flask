from .models import Libro, Autor


def create_book(title: str, author_ids_as_strings: str) -> Libro:
    # Convierte la cadena de identificadores en una lista de enteros
    author_ids = [int(aid) for aid in author_ids_as_strings.split(",") if aid.isdigit()]

    libro = Libro()
    libro.title = title
    # Busca los autores por los IDs y los asocia con el libro
    if author_ids:
        autores = Autor.query.filter(Autor.id.in_(author_ids)).all()  # type: ignore [misc]
        for autor in autores:
            libro.autores.append(autor)
    return libro
