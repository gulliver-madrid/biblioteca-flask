from .models import Libro, Autor


def create_book(title: str, author_ids_as_str: str) -> Libro:

    author_ids = to_ints(author_ids_as_str)
    if author_ids is None:
        raise RuntimeError(f'Campo autores no válido: "{author_ids_as_str}"')

    libro = Libro()
    libro.title = title
    libro.autores = get_autores_por_ids(author_ids)
    return libro


def update_book(libro: Libro, title: str, author_ids_as_str: str) -> None:
    libro.title = title

    author_ids = to_ints(author_ids_as_str)
    if author_ids is None:
        raise RuntimeError(f'Campo autores no válido: "{author_ids_as_str}"')

    libro.title = title
    libro.autores = get_autores_por_ids(author_ids)


def to_ints(string: str) -> list[int] | None:
    """
    Convierte la cadena de digitos separados por comas en una lista de enteros. Devuelve None si la cadena introducida no es valida
    """
    if any(not s.isdigit() and s != "," for s in string):
        return None
    if not string:
        return []
    splitted = string.split(",")
    if any(s == "" for s in splitted):
        return None
    return [int(s) for s in splitted]


def get_autores_por_ids(author_ids: list[int]) -> list[Autor]:
    return Autor.query.filter(Autor.id.in_(author_ids)).all()  # type: ignore [misc]
