from flask import Blueprint

# aqui se establece el blueprint

libro_api_blueprint = Blueprint("libro_api", __name__)

from . import routes
