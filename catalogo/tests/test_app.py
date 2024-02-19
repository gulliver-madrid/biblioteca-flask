import pytest

from flask import Flask

from src.application import db
from src.application.models import Autor, Libro
from src.application.transformations import (
    create_book,
    get_autores_por_ids,
    update_book,
)
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


def test_crear_libro_con_campo_autores_no_valido_genera_excepcion(
    app: Flask,
) -> None:
    with app.app_context():
        with pytest.raises(RuntimeError):
            create_book("Un libro", ",")


def test_el_id_se_incorpora_al_anadir_un_autor(app: Flask) -> None:
    """
    Este test muestra que la llamada a query.all() genera una llamada a
    session.flush() de tal forma que se asigna un id al Autor anadido.
    """
    with app.app_context():
        autor = Autor(nombre="Julio Verne")  # type: ignore [call-arg]
        db.session.add(autor)
        assert autor.id == None
        assert autor.nombre == "Julio Verne"
        # Esta llamada provoca el flush()
        first_autor = Autor.query.all()[0]
        assert first_autor.id == 1
        assert autor == first_autor
        assert autor.id == 1


def test_actualizar_libro(app: Flask) -> None:
    with app.app_context():
        libro = create_book("Un libro", "")
        db.session.add(libro)
        update_book(libro, "Nuevo titulo", "")
        assert libro.title == "Nuevo titulo"
        assert len(list(libro.autores)) == 0


def test_actualizar_libro_anadiendo_autor(app: Flask) -> None:
    with app.app_context():
        autor = Autor(nombre="Julio Verne")  # type: ignore [call-arg]
        db.session.add(autor)
        libro = create_book("Un libro", "")
        db.session.add(libro)

        update_book(libro, "Nuevo titulo", "1")

        assert libro.title == "Nuevo titulo"
        assert len(list(libro.autores)) == 1
        assert (
            libro.autores.first()  # pyright: ignore [reportAttributeAccessIssue,reportUnknownMemberType]
            == autor
        )


def test_actualizar_libro_con_campo_autores_no_valido_genera_excepcion(
    app: Flask,
) -> None:
    with app.app_context():
        libro = create_book("Un libro", "")
        db.session.add(libro)
        with pytest.raises(RuntimeError):
            update_book(libro, "Nuevo titulo", ",")


def test_actualizar_libro_eliminando_autor(app: Flask) -> None:
    with app.app_context():
        autor = Autor(nombre="Julio Verne")  # type: ignore [call-arg]
        db.session.add(autor)
        libro = create_book("Un libro", "1")
        db.session.add(libro)

        update_book(libro, "Nuevo titulo", "")

        assert libro.title == "Nuevo titulo"
        assert len(list(libro.autores)) == 0


def test_get_autores_por_ids(app: Flask) -> None:
    with app.app_context():
        primero = Autor(nombre="Julio Verne")  # type: ignore [call-arg]
        db.session.add(primero)
        segundo = Autor(nombre="Miguel de Cervantes")  # type: ignore [call-arg]
        db.session.add(segundo)
        tercero = Autor(nombre="Virginia Wolf")  # type: ignore [call-arg]
        db.session.add(tercero)
        assert get_autores_por_ids([1, 3]) == [primero, tercero]
