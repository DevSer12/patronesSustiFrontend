## Pasos de instalacion Opcion 1
### 1. Clonacion del proyecto del FrontEnd
Clonar el repositorio de github con el comando  
```bash
 git clone https://github.com/DevSer12/patronesSustiFrontend.git 
 ```
Abrir el proyecto en Visual Studio Code


### 2. Instalacion
Ubicarse en la carpeta del proyecto e instalar las dependencias con el comando : 
```bash
npm install  
```


### 3. Crear la base de datos
Abrir el cliente de base de datos en nuestro caso usamos DBeaver , crear la base de datos con el nombre de susti.


### 4.Clonar el proyecto del BackEnd
Clonar el repositorio de github con el comando  
```bash
 git clone https://github.com/redox11223/patronesSustiBackend
 ```
Abrir el proyecto en inteliJidea


### 5. Correr el BackEnd
Levantar el proyecto de backend sin errores. El proyecto contiene un archivo que al ejecutarse llena la base de datos con datos.


### 6. Correr el FrontEnd
Ejecutar el proyecto de Frontend con el comando 
```bash
npm run dev
```


### 7. Logueo de Usuario
Al cargar la aplicacion mostrara el LOGIN,  se debe ingresar con los siguientes datos.

| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | admin | `admin123` |


## Pasos de instalacion Opcion 2
### 1. Mediante Docker solo se necesita clonar el repositorio del backend usando el enlace.
```bash
 git clone https://github.com/redox11223/patronesSustiBackend
 ```

### 2.luego ejecutar en la terminal el comando:
```bash
docker-compose up -d
```
### 3. una vez que estan corriendo los contenedores se va a un navegador y se escribe localhost:80 
y se ingresa al aplicativo con las credenciales:
| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | admin | `admin123` |