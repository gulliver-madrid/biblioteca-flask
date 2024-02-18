import pytest

from flask import Flask
from sqlalchemy import create_engine, inspect
from typing import cast

from src.application import create_app, db


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
