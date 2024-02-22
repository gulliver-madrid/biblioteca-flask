from flask_migrate import Migrate
from flask_cors import CORS
from .application import create_app, db, JsonDict

FRONTEND_PORT = 5173


# desde aqui se ejecuta la aplicacion flask


# hay que importar models para que se definan los modelos
from .application import models  # pyright: ignore [reportUnusedImport]

app = create_app()
CORS(app, resources={r"/api/*": {"origins": f"http://localhost:{FRONTEND_PORT}"}})
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context() -> JsonDict:
    return {"db": db, "Autor": models.Autor, "Libro": models.Libro}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7001)
