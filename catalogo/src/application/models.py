from datetime import datetime
from . import db

# aqui se definen los modelos


class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "date_added": self.date_added,
        }
