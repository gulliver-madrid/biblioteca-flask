import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

JsonDict = dict[str, object]


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


from .. import config  # pyright: ignore [reportUnusedImport]


def create_app() -> Flask:
    app = Flask(__name__)

    environment_configuration = os.environ["CONFIGURATION_SETUP"]

    app.config.from_object(environment_configuration)

    db.init_app(app)

    with app.app_context():
        # Register blueprint
        from .libro_api import libro_api_blueprint

        app.register_blueprint(blueprint=libro_api_blueprint)
        return app
