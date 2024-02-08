from .application import create_app

# desde aqui se ejecuta la aplicacion flask

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7001)
