## USERS API

En este repositorio hay una API básica desarrollada con REST, que hace un CRUD básico de usuarios.

### TECH STACK

Para su desarrollo se utiliza 
NodeJS con ExpressJS
MongoDB como base de datos

**Librerías**
bcrypt para hasheado de contraseñas
mongoose para gestionar la base de datos con modelos predeterminados
jsonwebtoken para la generación de tokens de acceso con JWT

## Archivo .env | Variables de Entorno
Para el funcionamiento del servidor, debe crearse un archivo .env en la raíz de la ruta que contenga las siguientes variables de enterno:

**PORT** (Puerto que escuchará el servidor)
**JWT_SECRET_WORD** (Palabra secreta para cifrado de JWT)
**MONGO_DB_URI** (Cadena de conexión de una base de datos de mongoDB)

## Peticiones

**Crear Usuario**
`
POST /api/users
headers {Content-Type: application/json}
body {
        "firstName": String,
        "lastName": String,
        "dni": String,
        "gender": String (M || F),
        "phone": String,
        "status": String (active || pending),
        "password": String,
        "userName": String
    }
`

**Obtener Usuario por ID**
`
GET /api/users/:id
headers{Authorization: Bearer ${token}}
`

**Obtener todos los usuarios (filtrados por género o estatus)**
`
GET /api/users?gender=${valor de filtro para género}&status=${valor de filtro para estatus}
headers{Authorization: Bearer ${token}}
`

**Actualizar usuario**
`
PUT /api/users/:id
headers {   
            Content-Type: application/json,
            Authorization: Bearer ${token}
        }
body: {
        "firstName": String,
        "lastName": String,
        "dni": String,
        "gender": String (M || F),
        "phone": String,
        "status": String (active || pending),
        "userName": String
    }
`

**Eliminar usuario por ID**
`
DELETE /api/users/:id
headers{Authorization: Bearer ${token}}
`

## Responses
Todas las respuestas guardan la misma estrutura JSON, además del estatus code correspondiente:
`
{
    type: ("error" || "success" ), 
    msg: (null || string), 
    data: (null || Object)
}
`

