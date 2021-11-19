# FDIeSports_Telegram_bot 🤖

## Índice
1. [Descripción](#1-descripción-)
2. [Autor](#2-autor-%EF%B8%8F)
3. [Advertencia](#3-advertencia-%EF%B8%8F)
4. [Generar un token con @BotFather](#4-generar-un-token-con-botfather)
5. [Ejecución](#5-ejecución-%EF%B8%8F)
* 5.1. [Instalación _node_modules_](#instalación-node_modules-)
* 5.2. [Poner el Bot en producción](#poner-el-bot-en-producción-%EF%B8%8F)
   * 5.2.1. [En Windows](#en-windows-)
   * 5.2.2. [En Linux](#en-linux-debianubuntu-)
* 5.3 [Añadir nuevas librerías](#53-añadir-nuevas-librerías-)
6. [Licencia](#6-licencia-)
7. [Enlace al Bot](#7-enlace-al-bot-)
***
## 1. Descripción 📖
Bot de Telegram para la agrupación de esports de la Facultad de Informática de la Universidad Complutense de Madrid.
***
## 2. Autor ✒️
Fernando Méndez (https:/fermdez.ddns.net | @HumperCobra)
***
## 3. Advertencia ⚠️
Desbes generar tu propio token para el bot y añadirlo a _const token = 'AQUÍ_A_TU_TOKEN';_ en el archivo *bot.js*.
***
## 4. Generar un token con @BotFather
1. Inicia un chat con https://t.me/botfather
2. Escribe en el chat el comando */newbot*
3. Te pedirá el alias y luego el nombre del bot (debe contener la palabra _bot_).
4. Nos devolverá el token de nuestro bot, por ejemplo:

      > Use this token to access the HTTP API: 668219748:ABCRTZu7zNT5QO2bRfZfbPIXBLXb2U-ojVX
***  
## 5. Ejecución 🛠️
### 5.1 Instalación _node_modules_ 🔧
1. Creamos un directorio para el bot y guardamos ahí el archivo *bot.js*.
2. Instalar *node.js* 
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
3. Comprobar que se ha instalado con el comando:
 ```
   >/$ node --version
 ```
4. Dentro del directorio del bot, ejecutar los siguientes comandos:
 ```
   >/$ npm init --yes
   >/$ npm install --save node-telegram-bot-api
 ```
5. Comprobar que se ha generado el directorio _node_modules_.
### 5.2 Poner el Bot en producción ⚙️
#### 5.2.1 En Windows 💻
* Instala *nodejs*, si no lo hiciste en el punto anterior: https://nodejs.org/es/download/
* Ejecutar en CMD o PS los comandos:
 ```
  > cd ./ruta_del_directorio_del_bot/
  > node bot.js
 ```
* El proceso se puede automatizar creando un archivo .bat y añadiéndolo al programador de tareas.

#### 5.2.2 En Linux (Debian/Ubuntu) 🐧
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

### 5.3 Añadir nuevas librerías 📚
* Primero abrir un terminal/PowerShell/CMD (dependiendo de nuestro SO) e ir al directorio de nuestro bot:
   ```
   cd ./ruta_del_directorio_del_bot/
   ```
* Si por ejemplo queremos añadir la librería _weather-js_, deberemos escribir el siguiente comando:
   ```
   npm install weather-js
   ```
***
## 6. Licencia 📄
Educational Community License v2.0 (ECL-2.0).
## 7. Enlace al Bot 🤖
> https://t.me/FDIeSports_bot
