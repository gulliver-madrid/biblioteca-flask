# Biblioteca Microservicios

Proyecto de aprendizaje de creación de microservicios usando Flask, Express y React. Warning: force push risks!


## Arquitectura del proyecto
El proyecto contiene un frontend y dos microservicios como backend: uno desarrollado con Python y Flask, y otro con TypeScript y Express.


## Construcción del proyecto
Hay que construir cada parte por separado:
1. catalogo
   - Se utiliza una base de datos mysql. Es necesario tenerla instalada en el sistema, y haber creado el correspondiente usuario y contraseña, con los permisos correspondientes. Debe crearse un archivo `.env`, siguiendo el formato de `.env.example`, con el nombre, usuario y contraseña de la base de datos, y la clase de Python que almacena la configuración de desarrollo.
   - Es necesario tener instalado `poetry` y ejecutar `poetry install` desde el directorio `catalogo`. Para poner en marcha el servidor, ejecutar `poetry run python -m src.run`.
   - Para poblar la base de datos puede usarse una aplicación como Postman, la shell de Flask o el interfaz dela propia base de datos.

2. prestamos
   - Funciona como un sistema de solo lectura con propósitos de demostración. Los datos se incluyen en un archivo JSON.
   - Es necesario tener instalado Node y `npm` y ejecutar `npm install` desde la carpeta `prestamos`. Para poner en marcha el servidor, `npm run dev`.

3. frontend
  - Tener instalado Node y `npm` y ejecutar `npm install` desde el directorio `frontend`. Para poner en marcha el servidor, `npm run dev`.
