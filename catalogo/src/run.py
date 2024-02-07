from flask_migrate import Migrate
from .application import create_app, db

# desde aqui se ejecuta la aplicacion flask

app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7001)
