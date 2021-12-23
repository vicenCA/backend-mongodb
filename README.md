# Refooks Backend!

Bienvenidos al back-end construido en NodeJS y JavaScript con una base de datos no relacional como la de MongoDB.

## .env

A TENER EN CUENTA 
Instalación de MONGODB
https://www.mongodb.com/try/download/community

Realizar la instalación customizada y quitar el check de ejecutar mongo como un servicio para no tener necesariamente mongo activo en el computador siempre.

Luego de tenerlo instalado, se debe agregar en variables de entorno en configuración avanzada del equipo se debe pegar la siguiente ruta en la variable path:

C:\Program Files\MongoDB\Server\5.0\bin

Después crear una carpeta en la ruta C:\ llamada data, dentro de data debe crearse otra carpeta llamada db.

Luego ejecutar desde una consola el comando mongod donde el servidor de mongodb estará prendido y consistentemente.

## .env

Crear un archivo .env en la carpeta principal el cual contenga estos datos:

MONGO_URL=mongodb://localhost:27017/refooks
PORT_API=3000
SECRET_KEY=refookspassjwt
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Será necesario que crea una cuenta en cloudinary y rellene los datos de **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY** y **CLOUDINARY_API_SECRET** que se encuentran una vez registrado.

## Pasos finales

En Mongodbcompass agregar los archivos json con su schema respectivo,
Connectarse/ entrar en refooks/ entrar a la coleccion del archivo json, y añadir o importar data los archivos de **levels.json** y **achievement.json**.

Ultimo paso, (teniendo instalado nodejs y vsc con sus respectivas paths en las variables de entorno)
en la carpeta backend-mongodb:

ejecutar en la terminal los comandos:
- npm i
- npm run dev

Y listo.