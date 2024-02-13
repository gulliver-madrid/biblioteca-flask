from flask import Response, jsonify, request
from . import libro_api_blueprint
from .. import db, JsonDict
from ..models import Libro, Autor

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
    libro = Libro()
    libro.title = title

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
