from flask import Flask

from src.application import db
from src.application.models import Autor, Libro
from src.application.transformations import create_book
from .fixture import app  # pyright: ignore [reportUnusedImport]


def test_al_inicio_no_hay_libros(app: Flask) -> None:
    with app.app_context():
        assert Libro.query.count() == 0


def test_add_libro(app: Flask) -> None:
    with app.app_context():
        libro = Libro(title="Un Nuevo Libro")  # type: ignore [call-arg]
        db.session.add(libro)
        assert Libro.query.count() == 1


def test_crear_libro_sin_autores(app: Flask) -> None:
    """
    Testea la funcion create_book()
    """
    with app.app_context():
        libro = create_book("Un libro", "")
        assert libro.title == "Un libro"
        assert list(libro.autores) == []


def test_crear_libro_con_un_autor(app: Flask) -> None:
    with app.app_context():
        autor = Autor(nombre="Julio Verne")  # type: ignore [call-arg]
        db.session.add(autor)
        assert autor.nombre == "Julio Verne"
        libro = create_book("Un libro", "1")
        assert libro.title == "Un libro"
        assert len(list(libro.autores)) == 1
        assert list(libro.autores)[0].nombre == "Julio Verne"
        assert list(libro.autores)[0].id == 1

