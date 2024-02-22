# Construcción del proyecto

## Arquitectura del proyecto
El proyecto contiene un frontend y dos microservicios como backend: uno desarrollado con Python y Flask, y otro con TypeScript y Express.

## Construcción de las distintas partes
- catalogo
  - Se utiliza una base de datos mysql. Es necesario tenerla instalada en el sistema, y haber creado el correspondiente usuario y contraseña, con los permisos correspondientes.
  - Es necesario tener instalado `poetry` y ejecutar `poetry install` desde el directorio `catalogo`. Para poner en marcha el servidor, ejecutar `poetry run python -m src.run`.
- prestamos
  - Es necesario tener instalado Node y `npm` y ejecutar `npm install` desde la carpeta `prestamos`. Para poner en marcha el servidor, `npm run dev`.
- frontend
  - Tener instalado Node y `npm` y ejecutar `npm install` desde el directorio `frontend`. Para poner en marcha el servidor, `npm run dev`.
