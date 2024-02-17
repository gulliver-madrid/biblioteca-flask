from datetime import datetime
from . import db

# aqui se definen los modelos

autores_libros = db.Table(
    "autores_libros",
    db.Column("autor_id", db.Integer, db.ForeignKey("autores.id"), primary_key=True),
    db.Column("libro_id", db.Integer, db.ForeignKey("libros.id"), primary_key=True),
)


class Autor(db.Model):
    __tablename__ = "autores"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    # Relacion inversa (opcional)
    libros = db.relationship(
        "Libro", secondary=autores_libros, backref=db.backref("autores", lazy="dynamic")
    )

    def __repr__(self) -> str:
        return f'<Autor(id={self.id}, nombre="{self.nombre}")>'

    def to_json(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "date_added": self.date_added,
        }


class Libro(db.Model):
    __tablename__ = "libros"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    # La relacion con autores se maneja a traves de la tabla asociativa

    def __repr__(self) -> str:
        return f'<Libro(id={self.id}, title="{self.title}")>'

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "date_added": self.date_added,
        }
