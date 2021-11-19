# FDIeSports_Discord_bot 🤖

## Índice
1. [Descripción](#1-descripción-)
2. [Autor](#2-autor-%EF%B8%8F)
3. [Advertencia](#3-advertencia-%EF%B8%8F)
4. [Generar un token para tu bot](#4-generar-un-token-para-tu-bot-)
5. [Añadir el Bot a tu servidor de Discord](#5-añadir-el-bot-al-servidor-%EF%B8%8F)
6. [Ejecución](#6-ejecución-%EF%B8%8F)
* 6.1. [Instalación _node_modules_](#61-instalación-node_modules-)
* 6.2. [Poner el Bot en producción](#62-poner-el-bot-en-producción-%EF%B8%8F)
   * 6.2.1. [En Windows](#621-en-windows-)
   * 6.2.2. [En Linux](#622-en-linux-debianubuntu-)
* 6.3 [Añadir nuevas librerías](#63-añadir-nuevas-librerías-)
7. [Licencia](#7-licencia-)
***
## 1. Descripción 📖
Bot de Discord para la Asociación Diskobolo de la Facultad de Informática de la Universidad Complutense de Madrid.
***
## 2. Autor ✒️
Fernando Méndez (https:/fermdez.ddns.net | @HumperCobra)
***
## 3. Advertencia ⚠️
Desbes generar tu propio token para el bot y añadirlo a _"BOT_TOKEN" : "AQUÍ_A_TU_TOKEN"_ en el archivo *config.json*.
***
## 4. Generar un token para tu bot 💰
1. Entra en: https://discord.com/developers/applications/
2. Haz click en *New Application*.
3. Añade un nombre para el bot y pulsa en *Create*.
4. En la pestaña de *Bot*, pulsamos en *Add Bot* y hacemos click en *Yes, do it!*.
5. Aquí podremos copiar el *Token del Bot*, pulsando en *Copy*.
***
## 5. Añadir el Bot al servidor 🖥️
1. Continuando desde la página que estábamos en el paso anterior, pulsar en *OAuth2*.
2. En *SCOPES* selecionar *bot*.
3. En *BOT PERMISSIONS* seleccionar *Administrator*
4. Hacemos click en *Copy* y pegamos el enlace generado en el navegador con nuestra cuenta de discord iniciada.
5. Seleccionamos el servidor al que queremos añadir el bot.
***  
## 6. Ejecución 🛠️
### 6.1 Instalación _node_modules_ 🔧
1. Creamos un directorio para el bot y guardamos ahí el archivo *bot.js*.
2. Creamos el archivo *config.json*, donde escribimos el *Token del Bot*, con el siguente formato:
   ```
     {
         "BOT_TOKEN" : "TOKEN_DE_TU_BOT",
     }
   ```
3. Instalar *node.js* 
  * En Windows/Mac: https://nodejs.org/es/download/.
  * Si tienes Linux (Debian/Ubuntu), usa los siguientes comandos:
      ```
        $ sudo apt-get update
        $ sudo apt-get upgrade
        $ sudo apt-get install curl

        $ cd ~
        $ curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -

        $ sudo apt-get install -y nodejs

        $ cd ./ruta_del_directorio_del_bot/
        $ npm install
      ```
4. Comprobar que se ha instalado con el comando:
 ```
   >/$ node --version
 ```
5. Dentro del directorio del bot, ejecutar los siguientes comandos:
 ```
   >/$ npm init --yes
   >/$ npm install discord.js
 ```
6. Comprobar que se ha generado el directorio _node_modules_.
### 6.2 Poner el Bot en producción ⚙️
#### 6.2.1 En Windows 💻
* Instala *nodejs*, si no lo hiciste en el punto anterior: https://nodejs.org/es/download/
* Ejecutar en CMD o PS los comandos:
 ```
  > cd ./ruta_del_directorio_del_bot/
  > node bot.js
 ```
* El proceso se puede automatizar creando un archivo .bat y añadiéndolo al programador de tareas.

#### 6.2.2 En Linux (Debian/Ubuntu) 🐧
* Instalamos *nodejs*, si no lo hicimos en el punto anterior:
 ```
  $ sudo apt-get update
  $ sudo apt-get upgrade
  $ sudo apt-get install curl

  $ cd ~
  $ curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -

  $ sudo apt-get install -y nodejs

  $ cd ./ruta_del_directorio_del_bot/
  $ npm install
```

* Ejecutamos el bot con el comando:
 ```
   $ node bot.js
 ```

* El proceso se puede automatizar creando un script.

### 6.3 Añadir nuevas librerías 📚
* Primero abrir un terminal/PowerShell/CMD (dependiendo de nuestro SO) e ir al directorio de nuestro bot:
   ```
   cd ./ruta_del_directorio_del_bot/
   ```
* Si por ejemplo queremos añadir la librería _weather-js_, deberemos escribir el siguiente comando:
   ```
   npm install weather-js
   ```
***
## 7. Licencia 📄
Educational Community License v2.0 (ECL-2.0).
