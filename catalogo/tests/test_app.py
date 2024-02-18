from typing import cast
from flask import Flask
import pytest
from sqlalchemy import create_engine, inspect

from src.application import create_app, db
from src.application.models import Autor, Libro
from src.application.transformations import create_book


def has_tables(app: Flask) -> bool:
    """
    Devuelve un booleano indicando si la base de datos de la app tiene tablas
    """
    db_uri = cast(str, app.config["SQLALCHEMY_DATABASE_URI"])
    # Crea un motor SQLAlchemy usando la URL de la base de datos de prueba
    engine = create_engine(db_uri)

    # Crea un objeto inspector
    inspector = inspect(engine)

    # Obtiene una lista de los nombres de todas las tablas en la base de datos
    existing_tables = inspector.get_table_names()
    return len(existing_tables) > 0


@pytest.fixture
def app():  # type: ignore  [no-untyped-def]
    app = create_app(testing=True)
    assert app.config.get("TESTING") == True  # pyright: ignore reportUnknownMemberType

    # Chequeamos que realmente estamos en la base de datos de prueba
    if has_tables(app):
        raise RuntimeError(
            "No deberia haber tablas inicialmente en la base de datos de prueba"
        )

    with app.app_context():
        db.create_all()
    yield app
    with app.app_context():
        db.drop_all()


def test_al_inicio_no_hay_libros(app: Flask) -> None:
    with app.app_context():
        assert Libro.query.count() == 0


def test_add_libro(app: Flask) -> None:
    with app.app_context():
        libro = Libro(title="Un Nuevo Libro")  # type: ignore [call-arg]
        db.session.add(libro)
        assert Libro.query.count() == 1


def test_crear_libro_sin_autores(app: Flask) -> None:
    with app.app_context():
        libro = create_book("Un libro", "")
        assert libro.title == "Un libro"
        assert list(libro.autores) == []


def test_crear_libro_con_un_autor(app: Flask) -> None:
    with app.app_context():
        autor = Autor(nombre="Julio Verne")  # type: ignore [call-arg]
        db.session.add(autor)
        libro = create_book("Un libro", "1")
        assert libro.title == "Un libro"
        assert len(list(libro.autores)) == 1
        assert list(libro.autores)[0].nombre == "Julio Verne"
