import os
from pathlib import Path
from dotenv import (
    load_dotenv,
)  # pyright: ignore [reportMissingTypeStubs,reportGeneralTypeIssues,reportUnknownVariableType]

# aqui se establece la configuracion de la base de datos

dotenv_file_path = Path(__file__).parent.parent / ".env"


load_dotenv(dotenv_file_path)
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    ENV = "development"

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@localhost/{DB_NAME}"
    )


class ProductionConfig(Config):
    pass
