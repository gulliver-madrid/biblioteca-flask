from flask import jsonify, request
from . import libro_api_blueprint
from .. import db
from ..models import Libro, Autor

# aqui se definen las rutas


@libro_api_blueprint.route("/api/libros", methods=["GET"])
def get_libros():
    libros = []
    for row in Libro.query.all():  # pyright: ignore [reportUnknownVariableType]
        libros.append(  # pyright: ignore [reportUnknownMemberType]
            row.to_json()  # pyright: ignore [reportUnknownMemberType,reportUnknownArgumentType]
        )

    response = jsonify({"results": libros})
    return response


@libro_api_blueprint.route("/api/autores", methods=["GET"])
def get_autores():
    autores = []
    for row in Autor.query.all():  # pyright: ignore [reportUnknownVariableType]
        autores.append(  # pyright: ignore [reportUnknownMemberType]
            row.to_json()  # pyright: ignore [reportUnknownMemberType,reportUnknownArgumentType]
        )

    response = jsonify({"results": autores})
    return response


@libro_api_blueprint.route("/api/libro/add", methods=["POST"])
def add_book():
    title = request.form["title"]
    libro = Libro()
    libro.title = title

    db.session.add(libro)
    db.session.commit()

    response = jsonify({"message": "Libro added", "libro": libro.to_json()})
    return response


@libro_api_blueprint.route("/api/autor/add", methods=["POST"])
def add_author():
    nombre = request.form["nombre"]
    autor = Autor()
    autor.nombre = nombre

    db.session.add(autor)
    db.session.commit()

    response = jsonify({"message": "Author added", "autor": autor.to_json()})
    return response
