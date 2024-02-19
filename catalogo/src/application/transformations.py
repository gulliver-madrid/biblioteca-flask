from .helpers import to_ints
from .models import Libro, Autor


def create_book(title: str, author_ids_as_str: str) -> Libro:
    libro = Libro()
    update_book(libro, title, author_ids_as_str)
    return libro


def update_book(libro: Libro, title: str, author_ids_as_str: str) -> None:
    libro.title = title

    author_ids = to_ints(author_ids_as_str)
    if author_ids is None:
        raise RuntimeError(f'Campo autores no válido: "{author_ids_as_str}"')

    libro.title = title
    libro.autores = get_autores_por_ids(author_ids)


def get_autores_por_ids(author_ids: list[int]) -> list[Autor]:
    return Autor.query.filter(Autor.id.in_(author_ids)).all()  # type: ignore [misc]
