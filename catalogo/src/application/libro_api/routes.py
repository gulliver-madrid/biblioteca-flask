from flask import Response, jsonify, request
from . import libro_api_blueprint
from .. import db, JsonDict
from ..models import Libro, Autor
from ..transformations import create_book

# aqui se definen las rutas

### GET ###


@libro_api_blueprint.route("/api/libros", methods=["GET"])
def get_libros() -> Response:
    libros: list[JsonDict] = []
    for libro in Libro.query.all():  # type: ignore [misc]
        libros.append(libro.to_json())

    response = jsonify({"results": libros})
    return response


@libro_api_blueprint.route("/api/autores", methods=["GET"])
def get_autores() -> Response:
    autores: list[JsonDict] = []
    for autor in Autor.query.all():  # type: ignore [misc]
        autores.append(autor.to_json())

    response = jsonify({"results": autores})
    return response


### POST ###


@libro_api_blueprint.route("/api/libro/add", methods=["POST"])
def add_book() -> Response:
    title = request.form["title"]

    # Asume que los identificadores de los autores vienen en una cadena separada por comas
    author_ids_as_strings = request.form.get("author_ids", "")

    libro = create_book(title, author_ids_as_strings)

    db.session.add(libro)

    db.session.commit()

    response = jsonify({"message": "Libro added", "libro": libro.to_json()})
    return response


@libro_api_blueprint.route("/api/autor/add", methods=["POST"])
def add_author() -> Response:
    nombre = request.form["nombre"]
    autor = Autor()
    autor.nombre = nombre

    db.session.add(autor)
    db.session.commit()

    response = jsonify({"message": "Author added", "autor": autor.to_json()})
    return response


@libro_api_blueprint.route("/api/libro/<int:libro_id>", methods=["PUT"])
def update_book(libro_id: int) -> tuple[Response, int]:
    # Busca el libro por ID
    libro = Libro.query.get(libro_id)  # type: ignore [misc]
    if libro is None:
        return jsonify({"message": "Libro not found"}), 404

    # Actualiza los datos del libro con los nuevos valores proporcionados en la solicitud
    title = request.form.get("title")
    if title:
        libro.title = title

    # Guarda los cambios en la base de datos
    db.session.commit()

    return jsonify({"message": "Libro updated", "libro": libro.to_json()}), 200
