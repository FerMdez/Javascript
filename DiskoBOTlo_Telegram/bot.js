/*
{
  "name": "DiskoboBOTlo",
  "version": "3.0.0",
  "description": "Bot de la asociación Diskobolo de la Facultad de Informática de la Universidad Complutense de Madrid.",
  "main": "bot.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Fernando Méndez Torrubiano (https://fermdez.ddns.net | @HumperCobra)",
  "license": "Educational Community License v2.0 (ECL-2.0)",
  "dependencies": {
    "node-telegram-bot-api": "^0.51.0"
  }
}
*/
/* CONSTANTES */

// Importar las librerías:
const TelegramBot = require('node-telegram-bot-api');
const _private = require('./private.js');
// Token del bot: (const token = 'AQUÍ_TU_TOKEN';)
const token = _private.token();
// Create the bot:
const bot = new TelegramBot(token, {polling:true});
// ID grupo Diskobolo: (const IDGRUPO = 'AQUÍ_EL_ID_DE_TU_GRUPO';)
const IDGRUPO = _private.IDGRUPO();

const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const mcping = require('mc-ping');
const http = require('http');
const fs = require("fs");
const curl = require("curl");
//const OpenWeatherMapHelper = require("openweathermap-node");
const jsdom = require("jsdom");
const kelvinToCelsius = require('kelvin-to-celsius');
var schedule = require('node-schedule');
var moment = require('moment')
var nodejsWeatherApp = require('nodejs-weather-app');
const weather = require('weather-js');
const { brotliCompress } = require('zlib');
const { Recoverable } = require('repl');
const { userInfo } = require('os');
const { privateDecrypt } = require('crypto');
const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
])
const helper = _private.helper();
/* ---------------------------LISTA DE ADMINISTRADORES ADMINISTRADORES DEL BOT---------------------------*/
const _admins= _private.admins();
/* --------------------------------------------------------------------------------------------------------*/

// Palabras reservadas:
/* -------------------- */
//PALABRA DISKOBOLO
const palabradiskobolo = new RegExp(/\b([dD]iskobolo)\b/);
// PALABRA EXAMEN
const palabraexamen = new RegExp(/\b([eE]xamen)\b/);
//PALABRA IRONMAN
const palabraironman = new RegExp(/\b([iI]ron [mM]an)\b/);
//PALABRA THANOS
const palabrathanos = new RegExp(/\b([Tt]hanos)\b/);
//PALABRA NUCLEAR
const palabranuclear = new RegExp(/\b([Nn]uclear)\b/);
//PALABRA LLORO
const palabralloro = new RegExp(/\b([Ll]loro)\b/);
//PALABRA PYTHON
const palabrapython = new RegExp(/\b([Pp]ython)\b/);
//PALABRA JAVA
const palabrajava = new RegExp(/\b([Jj]ava)\b/);
//PALABRA DEBIAN
const palabradebian = new RegExp(/\b([Dd]ebian)\b/);
//PALABRA WINDOWS
const palabrawindows = new RegExp(/\b([Ww]indows)\b/);
/* -------------------- */

/* *** */

/* VARIABLES */
var tiempo;
var usuarios = [];
var temporaltiempo_usuario = 0;
var temporaltiempo_fecha = 0;
var temporaltiempo_comando = false;
var temporalminecraft_comando = false;
var temporalminecraft_usuario = 0;
var temporalminecraft_fecha = 0;
var temporalsistema_comando = false;
var temporalsistema_usuario = 0;
var temporalsistema_fecha = 0;
var temporalweb_comando = false;
var temporalweb_usuario = 0;
var temporalweb_fecha = 0;
var temporalactividades_comando = false;
var temporalactividades_usuario = 0;
var temporalactividades_fecha = 0;
var sistemas = ['Windows 10', 'Windows 7', 'Windows 8.1', 'Windows 8', 'Debian', 'ArchLinux', 'Ubuntu', 'MS-DOS', 'IBM PC DOS',
    'Windows 1.0', 'Windows 2.0', 'Windows 3.0', 'Windows NT', 'Windows 95', 'Windows 98', 'Windows Me', 'Windows XP', 'Windows Vista (El peor SO del mundo)', 
    'Windows 7', 'Windows 8', 'Windows 8.1', 'Windows 10', 'Windows 10 Lite', 'Windows IOT', 'Windows Phone 7', 'Windows Phone 8', 'Windows Phone 8.1', 'Windows 10 Mobile', 
    'Mac System Software', 'Mac System Software 1.1', 'Mac System Software 2.0', 'Mac System Software 3.0', 'Mac System Software 4.0', 'Mac System Software 5', 
    'Mac System Software 6', 'Mac System Software 7', 'Mac OS 7.6', 'Mac OS 8', 'Mac OS 9', 'Mac OS X', 'Mac OS X Puma', 'Mac OS X Jaguar', 'Mac OS X Panther', 
    'Mac OS X Leopard', 'Mac OS X Snow Leopard', 'Mac OS X Lion', 'Mac OS X Mountain Lion', 'Mac OS X Mavericks', 'Mac OS X Yosemite', 'Mac OS X El capitan', 
    'Mac OS X Sierra', 'Mac OS X High Sierra', 'Mac OS X Mojave', 'Mac OS X Catalina', 'Manjaro Linux', 'OpenSUSE', 'Ubuntu', 'Debian', 'Linux Mint', 'Raspbian', 
    'Arch Linux', 'Red Hat Enterprise Linux', 'Fedora', 'CentOS', 'Elementary OS', 'Kali Linux', 'BlackArch Linux', 'HannahMontanaOS', 'NicolasCageOS', 'Lubuntu', 
    'SteamOS', 'Scientific Linux', 'Linux', 'Android Apple Pie', 'Android Banana Bread', 'Android Cupcake', 'Android Donut', 'Android Eclair', 'Android Froyo', 
    'Android Gingerbread', 'Android Honeycomb', 'Android Ice Cream Sandwich', 'Android Jelly Bean', 'Android KitKat', 'Android Lolipop', 'Android Marshmallow', 
    'Android Nougat', 'Android Oreo', 'Android Pie', 'Android 10', 'Android 11', 'iPhone OS 1.0', 'iPhone OS 2.0', 'iPhone OS 3.0', 'iOS 4', 'iOS 5', 'iOS 6', 'iOS 7',
     'iOS 8', 'iOS 9', 'iOS 10', 'iOS 11', 'iOS 12', 'iOS 13', 'iOS 14', 'iPad OS', 'CoronavirusOS (disponible por tiempo limitado)'];
var a = false;
var search_so = schedule.scheduleJob('00 9 * * *', function () {
    console.log('¡Acabamos de elegir el sistema de hoy!');
    sistema = sistemas[Math.floor(Math.random() * sistemas.length)];
    a = true;
    bot.sendMessage(IDGRUPO, " ¡BUENOS DÍAS! 🥁️* EL SISTEMA OPERATIVO DE HOY ES... *🥁️ " + "\n" + sistema, { parse_mode: 'Markdown' })
});
var aniversario = schedule.scheduleJob('00 00 14 4 *', function () {
    console.log('¡Hoy es el aniversario de Diskobolo!');
    bot.sendMessage(IDGRUPO, "¡Hoy es el aniversario de Diskobolo! \n\n" +
        "La asociación Diskobolo fue fundada el 14 de Abril de 1992 y es la asociación más antigüa de la Facultad de Informática.", { parse_mode: 'Markdown' })
});
var sistema;
// ACTIVIDADES:
var cmp = 0;
var aux = 0;
var html = 0;
const url = "https://diskobolo.fdi.ucm.es/#actividades";
curl.get(url, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
        html = body;
    }
    else {
        //some error 
        ling
        console.log("error while fetching url");
    }
});
/* *** */

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* FUNCIONALIDADES */
// Captura de errores:
bot.on('polling_error', function(error){
    // Descomentar para trazar errores en el log.
    //console.log(error);
});

// Inicio del bot:
bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    var userId = msg.from.id;
    var date = msg.date;
    
    bot.sendMessage(chatId, "¡Hola *" + nameUser +"*! " +
        "¿Me has llamado verdad? 😊️\n\nSoy el bot de Diskóbolo, algunos me conocen como el *DiskoBOTlo* aunque me han programado para... ¡Darte la bienvenida!😎️" +
        "\n\nEstaré aquí para lo que necesites. 💪️" +
        "\n\n¿En qué te puedo ayudar? \nDejame pensar... 🤔️ escribe */comandos* para ver todo lo que puedo hacer. 🙃", {parse_mode : "Markdown"});
    
    console.log("[" + Date(date) + "] " + nameUser + " (" + userId + "): Ha iniciado el bot.");
    
    menu(msg);
});

// Llama al menú interactivo de ayuda:
bot.onText(/^\/comandos/, (msg) => {
   menu(msg);
});

// Llama al menú interactivo de ayuda:
bot.onText(/^\/help/, (msg) => {
    getHelp(msg);
 });

// Comando para mostrar las redes sociales de DSK:
bot.onText(/^\/rrss/, (msg) => {
    getRedes(msg);
});
bot.onText(/^\/redes/, (msg) => {
    getRedes(msg);
});

// Comando para mostrar próximas actividades:
bot.onText(/^\/actividades/, (msg) => {
    getActividades(msg);
});

// Comando para mostrar el estado de la web:
bot.onText(/^\/web/, (msg) => {
    getWeb(msg);
});

// Comando para mostrar el estado del servidor de Minecraft:
bot.onText(/^\/minecraft/, (msg) => {
    getMinecraft(msg);
});

// Comando para mostrar el Sistema Operativo del día:
bot.onText(/^\/sistemadeldia/, (msg) => {
    getSistemadeldia(msg);
});

// Comando para mostrar la localización del despacho 111:
bot.onText(/^\/despacho/, (msg) => {
    getDespacho(msg);
});

// Comando para mostrar el clima en la FDI:
bot.onText(/^\/weather/, (msg) => {
    getClima(msg);
});
bot.onText(/^\/clima/, (msg) => {
    getClima(msg);
});

//Comando para mostar las opciones de administradores:
bot.onText(/^\/admin/, (msg) => {
    admin(msg);
});

// Autor:
bot.onText(/^\/autor/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    var userId = msg.from.id;
    var date = msg.date;

    bot.sendMessage(chatId, "Autor👤: *Fernando Méndez 'Humpercobra'* \n" +
                                    "Web🌐: https://fermdez.ddns.net", {parse_mode : "Markdown"});

    console.log("[" + Date(date) + "] " + nameUser + " (" + userId + "): Ha solicitado el autor.");
});

/* Funcionalidades de Administradores: */
//ENVIAR
bot.onText(/^\/enviar/, function(msg){
    enviarComunidado(msg)
 });
 // Muestra el id del usuario que hace la petición:
 bot.onText(/^\/myid/, function(msg){
     getMyId(msg);
 });
 
 // Respuesta de comprobación del bot:
 bot.onText(/^\/ping/, function(msg){
     doPing(msg);
 });
 
 // Envía el himno de Diskobolo:
 bot.onText(/^\/himno/, function(msg){
     getHimno(msg);
 });
 
// Muestra los Estatutos y reglamento del régimen interno:
bot.onText(/^\/estatutos/, function(msg){
    getEstatutos(msg);
});

bot.onText(/^\/addmin/, function(msg){
    setAdmin(msg);
});


/* Pruebas: */
// Envía un dado:
bot.onText(/^\/dado/, function(msg) {
    getDado(msg);    
});
//Envía un dardo
bot.onText(/^\/dardo/, function(msg) {
   getDardo(msg);
});
//Envía un balón
bot.onText(/^\/ball/, function(msg) {
    getBall(msg);
 });


/* ------------------------------------------------------------------------------------------------------ */
/* No añadas funcionalidades debajo de aquí, no funcionarán (pero sí puedes añadir funciones, más abajo). */

// Detección de palabras reservadas:
bot.on('message', (msg) => {
    var mensaje = msg.text;

    //Si entra al grupo un nuevo usuario:
    if (msg.new_chat_members != undefined){
        getMensajeBienvenida(msg);    
        //bot.sendMessage(chatId, "Hola " + nameNewMember + ", bienvenido al grupo " + chatitle);
    } //Cuando un usuario abandona el grupo
    else if (msg.left_chat_member != undefined){
        getMensajeDespedida(msg);
        //bot.sendMessage(chatId, nameLeftMember + " abandonó el grupo");
    }

    if(mensaje.includes('diskobolo') || mensaje.includes('Diskobolo')){
        bot.sendMessage(msg.chat.id, "Diskoporro*");
    }
    if(mensaje.includes('iron man') || mensaje.includes('Iron Man') 
    || mensaje.includes('ironman') || mensaje.includes('IronMan') 
    || mensaje.includes('Iron man') || mensaje.includes('Ironman')){
        bot.sendAudio(msg.chat.id,"./src/audio/ironman.mp3",{caption : "Y yo... soy Iron Man."});
    }
    if(mensaje.includes('thanos') || mensaje.includes('Thanos')){
        bot.sendAudio(msg.chat.id,"./src/audio/thanos.mp3",{caption : "Yo soy INEVITABLE."});
    }
    if(mensaje.includes('nuclear') || mensaje.includes('Nuclear')){
        bot.sendAudio(msg.chat.id,"./src/audio/nucelar.mp3",{caption : "Nucelar, la palabra es nucelar."});
    }
    if(mensaje.includes('examen') || mensaje.includes('Examen')){
        bot.sendMessage(msg.chat.id, "Parece que intentas suicidarte, ¿necesitas ayuda? 🙃");
    }
    if(mensaje.includes('lloro') || mensaje.includes('Lloro')){
        bot.sendMessage(msg.chat.id, msg.chat.first_name + " deja de llorar.");
    }
    if(mensaje.includes('windows') || mensaje.includes('Windows')){
        bot.sendMessage(msg.chat.id, "¡Windows días! 🪟");
    }
    if(mensaje.includes('debian') || mensaje.includes('Debian')){
        bot.sendMessage(msg.chat.id, "Hola caracola 🐚");
    }
    if(mensaje.includes('java') || mensaje.includes('Java')){
        bot.sendMessage(msg.chat.id, "Intenté ligar con una informática, pero no sé deJAVA (ba dum chss...)");
    }
    if(mensaje.includes('python') || mensaje.includes('Python')){
        bot.sendMessage(msg.chat.id, "Ha dicho Python 🤮");
    }
});

/* *** */




/* ------------------------------------------------------------------------------------------------------ */
/* FUNCIONES */

//Mensaje de bienvenida al entrar en el grupo de Diskobolo:
function getMensajeBienvenida(msg) {
    //var nameUser = msg.from.first_name;
    //var chatitle = msg.chat.title;
    var chatId = msg.chat.id;
    var nameNewMember = msg.new_chat_member.first_name;
    var date = msg.date;

    if (msg.new_chat_member.is_bot == true){
        bot.sendMessage(chatId, "🔏️ *Bienvenido a Diskóbolo, " + nameNewMember + "* 🔓️. \nSé que eres otro bot, te estoy vigilando 👀", {parse_mode: 'Markdown'});
        console.log(nameNewMember + ": Ha entrado al grupo.");
    }
    else {
        bot.sendMessage(chatId, "🔏️ *Bienvenido a Diskóbolo, " + nameNewMember + "*. \nSoy el DiskoBotlo 🔓️" + 
            "\nEstamos deseando verte por el *despacho 111* (primera planta)." +
            "\n\n- Siguenos  en *Twitter*: [Twitter](https://www.twitter.com/dskbolo) \n- Visita nuestra *web*: [Web](http://diskobolo.fdi.ucm.es) \n" + 
            "\n-*Y si aún no eres socio, registrate con tu cuenta UCM*, a través de este enlace: https://forms.gle/4Y7cNZu3yTx5FKyUA \n", { parse_mode: 'Markdown' });
        console.log("[" + Date(date) + "] " + nameNewMember + ": Ha entrado al grupo.");
    }
}

//Mensaje de despedida al salir del grupo de Diskobolo:
function getMensajeDespedida(msg) {
    var chatId = msg.chat.id;
    //var chatitle = msg.chat.title;
    var nameLeftMember = msg.left_chat_member.first_name;
    var date = msg.date;

    bot.sendMessage(chatId, "*" + nameLeftMember + "* abandonó el grupo. Te echaremos de menos ❤️", {parse_mode: 'Markdown'});
    console.log("[" + Date(date) + "] " + nameUser + ": Ha abandonado el grupo");
}

// Menú interactivo de ayuda:
function menu(msg){
    var chatId = msg.chat.id;
    //var userName = msg.from.first_name;
    //var tipoChat = msg.chat.type;
    
    bot.sendMessage(chatId, "<b>Selecciona una opción: </b> \n\n(Escribe /comandos para volver a mostrar este menú o /help para mostrar la descripción de cada comando). ",
    {
    reply_markup: {
        inline_keyboard: [
            [
                {
                text:"Redes Sociales 💙", callback_data: 'redes',
                }
            ],
            [   
                {
                    text:"Próximas actividades 📅", callback_data: 'actividades',
                }
            ],
            [
                {
                    text:"Estado de la página web 🌍️", callback_data: 'web',
                },
                {
                    text:"Servidor de Minecraft ⛏", callback_data: 'minecraft',
                }
            ],
            [  
            {
            
                text:"Sistema Operativo del día 💻", callback_data: 'so',
            }
            ],
            [
            {
                text:"Localización Despacho 📍", callback_data: 'despacho',
            },
            {
            
                text:"Clima en la FDI ⛅", callback_data: 'weather',
            }
            ],
            [
                {
                text:"Enviar un dado🎲", callback_data: 'dado',
                },
                {
                
                text:"Enviar un dardo🎯", callback_data: 'dardo',
                },
                {
                text:"Enviar un balón⚽️", callback_data: 'ball',
                }
            ],
            [
                {
                    text:"Comandos de administradores 🛡️",callback_data: 'admin',
                }
            ],
        ]
    },
    parse_mode:"HTML",
    });
    console.log("[" + Date(msg.date) + "] " + msg.from.first_name + "(" + msg.from.id + "): Ha usado el comando /comandos.");
}

// Respuestas a la pulsación de botones:
bot.on('callback_query', function onCallbackQuery(accionboton){
    const data = accionboton.data;
    const msg = accionboton.message;

    switch(data){
        case 'redes': getRedes(accionboton);
            break ;
        case 'actividades': getActividades(accionboton);
            break ;
        case 'minecraft': getMinecraft(accionboton);
            break ;
        case 'web': getWeb(accionboton);
            break ;
        case 'so': getSistemadeldia(accionboton);
            break ;
        case 'despacho': getDespacho(accionboton);
            break ;
        case 'weather': getClima(accionboton);
            break ;
        case 'admin': admin(accionboton);
            break ;
        case 'dado': getDado(accionboton);
            break ;
        case 'dardo': getDardo(accionboton);
            break ;
        case 'ball': getBall(accionboton);
            break ;
        case 'estatutos': sendEstatutos(msg);
            break;
        case 'reglamento': sendReglamento(msg);
            break;
    }

});

// Muestra la lista de comandos disponibles:
function getHelp(msg){
    bot.sendMessage(msg.chat.id, "¡Estos son todos los comandos que puedes usar! 😱️\n\n" +
     "/actividades - ¡Descubre todas las *actividades que tenemos pendientes* antes del fin del mundo! 🌍️📅 \n\n" +
      "/ball - Envía un *balón*. ⚽️🏀 \n\n" +
       "/comandos - Muestra el menú de comandos. 📋🖨️ \n\n" +
        "/dado - Envía un *dado*. 🎲 \n\n" +
         "/dardo - Envía un *dardo*. 🎯 \n\n" +
          "/despacho - *¿No sabes dónde está nuestro bunker?* Con este comando lo averigüarás. 📍🌍️ \n\n" +
           "/help  - Muestra la información de cada comando. 📑🖨️ \n\n" +
            "/minecraft - Comprueba el *estado de nuestro servidor de Meincraff*, debería estar abierto durante 1000 años ⛏🧱 \n\n" +
             "/rrss - Todas las *redes sociales de Diskobolo*. 🐦📷 \n\n" +
              "/sistemadeldia - ¿Quemando ISOs todo el día? 😥️ *¡Te ayudamos a elegir el sistema todos los días!* 😜️ \n\n" +
               "/weather - Muestra el *clima actual en Ciudad Universitaria*. 🌞⛅ \n\n" +
                "/web - ¿Quieres saber si Chema Alonso ha hackiado tu internete y por eso no te carga nuestra web? 😱️ ¡Nosotros lo comprobamos por ti! 😊️ \n\n" + 
                 "/autor - Muestra información sobre el autor. ✍️👱‍♂️ \n\n" +
                  "/admin - Comandos disponibles para *administradores*. 🛡️🛡️" +
                   "\n\n-------------------------\n\n¿Se te ocurre algo más en lo que crees que puedo ayudarte? 🤯️ \n\n" +
                    "*¡PÁSATE POR EL DESPACHO 111!* Estaremos encantados de ayudarte 😊️ \n\n", {parse_mode : "Markdown"});

    console.log("[" + Date(msg.date) + "] " + msg.from.first_name + "(" + msg.from.id + "): Ha usado el comando /help.");
}

// Muestra las redes sociales de FDIeSports:
function getRedes(msg){
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/redes' || msg.text == '/rrss' 
        || msg.text == '/redes@DiskoBOTlo_BOT' || msg.text == '/rrss@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    }
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
            [
                {
                text:"Web🌐", url:"https://diskobolo.fdi.ucm.es/"
                },
                {
                text:"Twitter🐦", url:"https://twitter.com/DskBolo"
                }
            ],
            [
                {
                    text:"Instagram📷", url:"https://www.instagram.com/diskobolo/"
                },
                {
                    text:"Facebook👍", url:"https://www.facebook.com/DiskoboloUCM/"
                }
            ],
            [
                {
                    text:"YouTube🎥", url:"https://www.youtube.com/channel/UC-zaEabLK02ctakxUkE8Zwg"
                },
                {
                    text:"Twitch🔴", url:"https://www.twitch.tv/diskobolo"
                }
            ],
            ]
        },
        parse_mode:"HTML",
        };
    
    bot.sendMessage(chatId, "<b><i>" + userName + ", estas son las redes sociales de Diskobolo:</i></b>",keyboard);
    console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /redes.");
}

// Muestra las próximas actividades de Dsikobolo:
function getActividades(msg){
    var userId = msg.from.id;
    var userName = msg.from.first_name;
    if(msg.text == '/actividades' || msg.text == '/actividades@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var msgId = msg.message_id;
        var msgDate= msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var msgId = msg.message.message_id;
        var msgDate = msg.message.date;
    }

    if (userId == temporalactividades_usuario) {
        //console.log("Usuario interactuando con el bot, ID: " + userId);
        if ((msgDate) > (temporalactividades_fecha + 10) || (msgDate) == (temporalactividades_fecha)) {
            //console.log(chatId);
            //bot.sendMessage(userId, userName + ", estas son las próximas actividades de Diskobolo.");
            parseData(html, chatId, msg);
        } else {
            bot.sendMessage(userId, userName + ", espera y vuelve a intentarlo más tarde.");
            bot.deleteMessage(chatId, msgId)
            temporalactividades_fecha = msgDate;
        }
    } else {
        if ((msgDate) > (temporalactividades_fecha + 10) || (msgDate) == (temporalactividades_fecha)) {
            //console.log(chatId);
            //bot.sendMessage(userId, userName + ", estas son las próximas actividades de Diskobolo.");
            parseData(html, chatId, msg);
        }
        temporalactividades_usuario = userId;
        temporalactividades_fecha = msgDate;
        //console.log("Usuario interactuando con el bot, ID: " + userId);
    }
    temporalactividades_comando = true;
}
// Parsea los datos de las actividades de la web:
function parseData(html, idchat, msg) {
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    var date = msg.date;
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);
    //let's start extracting the data
    var counter = 0;
    var aux = 0;
    $('table tr td').each(function (cmp) {
        var casa = sustituirvalor(counter, aux);
        var burrito
        //console.log(counter + "\n" + aux + $(this).text())
        if (aux == 3) {
            counter = 0;
            aux = 0;
            burrito = ""
            casa = sustituirvalor(counter, aux);
            counter++;
            aux++;
        } else {
            burrito = ""
            counter++;
            aux++;
        }
        if ($(this).text() == "Semana de la Informática Diskóbolo 1996 (SID96)") {
            return false;
        }
        fs.appendFileSync("temp.txt", casa + " " + "<i>" + $(this).text() + "</i>" + burrito, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });

    });
    try {
        var data = fs.readFileSync('temp.txt', 'utf8');
        var texto = data.toString();
        bot.sendMessage(idchat, userName + ", estas son las próximas actividades de Diskobolo: " + texto, { parse_mode: 'HTML' });
        console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /actividades.");
    } catch (e) {
        console.log('Error:', e.stack);
    }
    fs.unlink('temp.txt', function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}
// Tabla de actividades:
function sustituirvalor(counter, aux) {
    if (counter == 0) {
        return "\n \n 🌟️ <b>ACTIVIDAD:</b> "
    }
    if (counter == 1) {
        return "\n 📰️ <b>DESCRIPCIÓN:</b> "
    }
    if (counter == 2) {
        return "\n 🕓️ <b>FECHA:</b> "
    }
}

//Funciones para mostrar el estado del servidor de Minecraft:
function getMinecraft(msg){
    getJugadores(msg);
}
// Muestra los jugadores conectados al servidor de Minecraft:
function getJugadores(msg) {
    var myData = [];
    var requestify = require('requestify');
    var jsdoms = require("jsdom");
    const { JSDOM } = jsdom;
    const { window } = new JSDOM();
    const { document } = (new JSDOM('')).window;
    global.document = document;

    var $ = jQuery = require('jquery')(window);

    $.getJSON('https://api.mcsrvstat.us/2/diskobolo.fdi.ucm.es', function (status) {
        //Show the version
        console.log(status.version);
        console.log(status.players.online)
        //Show a list of players
        $.each(status.players.list, function (index, player) {
            console.log(player);
            myData.push(player)

        });
        getServidorMinecraft(msg, myData)
    });

}
// Muestra la información del servidor de Minecraft:
function getServidorMinecraft(msg, myData) {
    console.log(msg.forward_from_chat);
    var userId = msg.from.id;
    var userName = msg.from.first_name;
    if(msg.text == '/minecraft' || msg.text == '/minecraft@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var msgId = msg.message_id;
        var msgDate= msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var msgId = msg.message.message_id;
        var msgDate = msg.message.date;
    }
    if (userId == temporalminecraft_usuario) {
        if ((msgDate) > (temporalminecraft_fecha + 10) || (msgDate) == (temporalminecraft_fecha)) {
            mcping('diskobolo.fdi.ucm.es', 25565, function (err, res) {
                if (err) {
                    // Some kind of error
                    console.error(err);
                    bot.sendMessage(chatId, userName + ", el servidor no funciona. Ha debido explotar un creeper 🤷‍♂️");
                } else {
                    // Success!
                    bot.sendMessage(chatId, userName + ": 🤯️* ESTADO DEL SERVIDOR DE MINECRAFT *🤯️" + "\n \n" + "*Server:* " + res.server_name + "\n \n" + "*Versión de Minecraft: *" + res.minecraft_version + "\n \n" + "*Número de jugadores conectados: *" + res.num_players + "\n \n" + "*JUGADORES:* " + "\n" + myData, { parse_mode: 'Markdown' })
                    console.log(res.server_name);
                    temporalminecraft_fecha = msgDate;
                }
            }, 3000)
        } else {
            bot.sendMessage(userId, userName + ", espera y vuelve a intentarlo más tarde.");
            bot.deleteMessage(chatId, msgId)
            temporalminecraft_fecha = msgDate;
        }
    } else {
        if ((msgDate) > (temporalminecraft_fecha + 10) || (msgDate) == (temporalminecraft_fecha)) {
            mcping('diskobolo.fdi.ucm.es', 25565, function (err, res) {
                if (err) {
                    // Some kind of error
                    console.error(err);
                } else {
                    // Success!
                    bot.sendMessage(chatId, userName + ": 🤯️* ESTADO DEL SERVIDOR DE MINECRAFT *🤯️" + "\n \n" + "*Server:* " + res.server_name + "\n \n" + "*Versión de Minecraft: *" + res.minecraft_version + "\n \n" + "*Número de jugadores conectados: *" + res.num_players + "\n \n" + "*JUGADORES:* " + "\n" + myData, { parse_mode: 'Markdown' })
                    console.log(res.server_name);
                    temporalminecraft_fecha = msgDate;
                }
            }, 3000)
        }
        temporalminecraft_usuario = userId;
        temporalminecraft_fecha = msgDate;
        console.log("[" + Date(msgDate) + "] " + userName + "(" + userId + "): Ha usado el comando /minecraft.");
    }
    temporalminecraft_comando = true;
}

// Devuelve el estado de la web de Diskobolo:
function getWeb(msg){
    var userId = msg.from.id;
    var userName = msg.from.first_name;
    if(msg.text == '/web' || msg.text == '/web@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var msgId = msg.message_id;
        var msgDate= msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var msgId = msg.message.message_id;
        var msgDate = msg.message.date;
    }
    if (userId == temporalweb_usuario) {
        //console.log("Usuario interactuando con el bot, ID: " + userId);
        if ((msgDate) > (temporalweb_fecha + 10) || (msgDate) == (temporalweb_fecha)) {
            curl.get("https://diskobolo.fdi.ucm.es/", null, (err, resp, body) => {
                if (resp.statusCode == 404) {
                    bot.sendMessage(chatId, userName + " ¡Chema Alonso ha hackiado la web!");
                }
                else {
                    //some error handling
                    bot.sendMessage(chatId, userName + ", la web funciona correctamente. ✔️");
                    temporalweb_fecha = msgDate;
                }
            });
        } else {
            bot.sendMessage(userId, userName + ", espera y vuelve a intentarlo más tarde.");
            bot.deleteMessage(chatId, msgId)
            temporalweb_fecha = msgDate;
        }
    } else {
        if ((msgDate) > (temporalweb_fecha + 10) || (msgDate) == (temporalweb_fecha)) {
            curl.get("http://diskobolo.fdi.ucm.es/", null, (err, resp, body) => {
                if (resp.statusCode == 404) {
                    bot.sendMessage(chatId, userName + " ¡Chema Alonso ha hackiado la web! ❌");
                }
                else {
                    //some error handling
                    bot.sendMessage(chatId, userName + ", la web funciona correctamente. ✔️");
                    temporalweb_fecha = msgDate;
                }
            });
        }
        temporalweb_usuario = userId;
        temporalweb_fecha = msgDate;
        //console.log("Nuevo usuario interactuando con el bot, ID: " + userId);
    }
    temporalweb_comando = true;
    console.log("[" + Date(msgDate) + "] " + userName + "(" + userId + "): Ha usado el comando /web.");
}

// Devuelve el sistema operativo del día:
function getSistemadeldia(msg){
    var userId = msg.from.id;
    var userName = msg.from.first_name;

    if(msg.text == '/sistemadeldia' || msg.text == '/sistemadeldia@DiskoBOTlo_BOT'
        || msg.text == '/so' || msg.text == '/so@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var msgId = msg.message_id;
        var msgDate= msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var msgId = msg.message.message_id;
        var msgDate = msg.message.date;
    }
    
    if (userId == temporalsistema_usuario) {
        console.log(userName + "(" + userId + "): Ha usado el comando /sistemadeldia.");
        if ((msgDate) > (temporalsistema_fecha + 10) || (msgDate) == (temporalsistema_fecha)) {
            if (a == false) {
                sistema = sistemas[Math.floor(Math.random() * sistemas.length)];
                a = true;
            }
            bot.sendMessage(chatId, userName + ", 🥁️*¡EL SISTEMA OPERATIVO DE HOY ES.... *🥁️ " + "\n" + sistema, { parse_mode: 'Markdown'});
            console.log("[" + Date(msgDate) + "] " + userName + "(" + userId + "): Ha usado el comando /sistemadeldia.");
        } else {
            bot.sendMessage(userId, userName + ", espera y vuelve a intentarlo más tarde.")
            bot.deleteMessage(chatId, msgId);
            temporalsistema_fecha = msgDate;
        }
    } else {
        if ((msgDate) > (temporalsistema_fecha + 10) || (msgDate) == (temporalsistema_fecha)) {
            if (a == false) {
                sistema = sistemas[Math.floor(Math.random() * sistemas.length)];
                a = true;
            }
            bot.sendMessage(chatId, userName +  ", 🥁️*¡EL SISTEMA OPERATIVO DE HOY ES.... *🥁️ " + "\n" + sistema, { parse_mode: 'Markdown'});
        }
        temporalsistema_usuario = userId;
        temporalsistema_fecha = msgDate;
        console.log("[" + Date(msgDate) + "] " + userName + "(" + userId + "): Ha usado el comando /sistemadeldia.");
    }
    temporalsistema_comando = true;
}

function getDespacho(msg){
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/despacho' || msg.text == '/localizacion'
    || msg.text == '/despacho@DiskoBOTlo_BOT' || msg.text == '/localizacion@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    }
    bot.sendMessage(chatId, "*"+ userName + "*" + ", esta es la localización del *despacho 111*. ", {parse_mode: 'Markdown'});
    bot.sendLocation(chatId, 40.45304029714122, -3.733060461650645);
    console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /despacho.");
}

// Muestra la temperatura y el clima en Ciudad universitaria:
function getClima(msg){
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/weather' || msg.text == '/clima' 
        || msg.text == '/weather@DiskoBOTlo_BOT' || msg.text == '/clima@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    }
    var ciudad = 'Madrid/Moncloa';

    var opciones = {
        search: ciudad, // lugar es la ciudad que el usuario introduce
        degreeType: 'C', // Celsius
        lang: 'es-ES' // Lenguaje en el que devolverá los datos
    }

    weather.find(opciones, function(err, result){

        if (err){ // Si ocurre algun error...
            console.log(err); // ... nos lo muestra en pantalla

        } else {
            console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /clima.");
            console.log(result[0]); // Visualizamos el primer resultado del array
            
            bot.sendMessage(chatId, "*" + userName + "*" + ", esta es la información del tiempo: \n" +
            "-------------------------------------------\n" +
            "Lugar: " + "*" + result[0].location.name + "*" +
            "\n\nTemperatura: " + "*" + result[0].current.temperature + "ºC\n" + "*" +
            "Visibilidad: " + "*" + result[0].current.skytext + "\n" + "*" +
            "Humedad: " + "*" + result[0].current.humidity + "%\n" + "*" +
            "Dirección del viento: " + "*" + result[0].current.winddisplay + "\n" + "*"
            ,{parse_mode: 'Markdown'});

        }
    });
}

//Devuelve un dado:
function getDado(msg){
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/dado' || msg.text == '/dado@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    }

    bot.sendMessage(chatId, "*" + userName + "*, envió un lanzó.", {parse_mode: 'Markdown'});
    bot.sendDice(chatId).then(function (info) {
        console.log(info);
        console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /dado.");
    });
}

function getDardo(msg){
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/dardo' || msg.text == '/dardo@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    }
    const opts = {
        'emoji': '🎯'
    }
    bot.sendMessage(chatId, "*" + userName + "*, lanzó un dardo.", {parse_mode: 'Markdown'});
    bot.sendDice(chatId, opts).then(function (info) {
        console.log(info);
        console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /dardo.");
    });
}

function getBall(msg){
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/ball' || msg.text == '/balon' || msg.text == '/ball@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    }
    var ball = Math.floor(Math.random() * 2);
    console.log(ball);
    switch(ball){
        case 0:
            var opts = {
                'emoji': '⚽️'
            }
            break;
        case 1:
            var opts = {
                'emoji': '🏀'
            }
            break;
    }
    bot.sendMessage(chatId, "*" + userName + "*, lanzó una pelota.", {parse_mode: 'Markdown'});
    bot.sendDice(chatId, opts).then(function (info) {
        console.log(info);
        console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /ball.");
    });
}


/*FUNCIONES DE ADMINISTRADORES*/
function admin(msg) { 
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    if(msg.text == '/admin' || msg.text == '/admin@DiskoBOTlo_BOT'){
        var chatId = msg.chat.id;
        var tipoChat = msg.chat.type;
        var date = msg.date;
    }
    else {
        var chatId = msg.message.chat.id;
        var tipoChat = msg.message.chat.type;
        var date = msg.message.date;
    }

    if (getpermisos(msg)) {
        if (tipoChat == 'private'){
            bot.sendMessage(chatId, "Bienvenido a la sala de máquinas de Diskóbolo. \n ¿Qué quieres saber? \n\n" +
            'Comandos disponibles: \n\n 1. El bot envia y fija un mensaje *AL GRUPO DE DISKOBOLO*. \n *Solo debe ser empleado para comunicados oficiales con autorización previa del presidente.* \n Uso: _/enviar "Texto, no son necesarias las comillas."_ \n\n' + 
            '2. Comprobar que el bot funciona correctamente. \n *No sirve para nada.* \n Uso: _/ping "Debe devolver: Pong 🏓"_  \n\n' +
            '3. Obtener tu id de usuario. \n *Para añadir administradores del bot que puedan acceder a estos comandos (lo pueden usar NO administradores, para que su función tenga sentido).* \n Uso: _/myid "Delvolverá un id de usuario."_ \n\n' +
            '4. Añadir un nuevo administrador del BOT. \n *Tendrá acceso a todos los comandos de administración* \n Uso: _/addmin "ID del nuevo admin, SIN comillas"_ \n\n' +
            '5. Enviar el himno *AL GRUPO DE DISKOBOLO*. \n *Para escuchar antes de comenzar las juntas de socios.* \n Uso: _/himno "Devuelve un archivo de audio con el himno de DSK." _ \n\n' +
            '6. Consultar los *estatutos* y *reglamento del régimen interno*. \n *Envía un documento con el PDF seleccionado de la asociación.* \n Uso: _/estatutos "Te dará a aelegir entre uno de los dos codumentos."_  \n\n'
            , { parse_mode: 'Markdown' });
            
        } 
        else if (tipoChat == 'supergroup' || tipoChat == 'group') {
            bot.sendMessage(chatId, userName + ", este comando sólo funciona en privado.");
        }
    }
    else {
        bot.sendMessage(chatId, "Lo siento " + userName + ", no eres administrador.");
    }
    console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /admin.");
}

// CÓDIGOS DE PERMISOS PARA ADMINISTRADOR [AÑADIR SÓLO ID DE TELEGRAM DE GENTE DE JUNTA]
function getpermisos(msg) {
    var userId = msg.from.id;
    var nameUser = msg.from.first_name;

    if(msg.data == 'admin'){
        var chatId = msg.message.chat.id;
        var date = msg.message.date;
    } else {
        if (msg.text.includes('/enviar') || msg.text.includes('/enviar@DiskoBOTlo_BOT')
            || msg.text.includes('/addmin') || msg.text.includes('/addmin@DiskoBOTlo_BOT')) {
            var chatId = msg.chat.id;
            var date = msg.date;
        }
        else if(msg.text == '/admin' || msg.text == '/admin@DiskoBOTlo_BOT'
            || msg.text == '/ping' || msg.text == '/ping@DiskoBOTlo_BOT'
            || msg.text == '/himno' || msg.text == '/himno@DiskoBOTlo_BOT'
            || msg.text == '/estatutos' || msg.text == '/estatutos@DiskoBOTlo_BOT'){
            var chatId = msg.chat.id;
            var date = msg.date;
        }
        else {
            var chatId = msg.message.chat.id;
            var date = msg.message.date;
        }
    }
    console.log(chatId);
    
    var admin = false;
    var i = 0;

    while(!admin && i < _admins.length){
        if(userId == _admins[i]){
            admin = true
        }
        i++;
    }

    if (admin) {
        console.log("[" + Date(date) + "] " + "Admin loggued, chat ID: " + chatId);
        return true;
    } else {
        console.log("[" + Date(date) + "] " + "No admin try, ID/USER: " + userId + " | " + nameUser);
        bot.sendMessage(chatId, "Error 404, admin not found.");
        return false;
    }
}

// Envía y ancla un mensaje al grupo de Diskobolo:
function enviarComunidado(msg){
    var comunicado = "";
    var mensaje = msg.text;
    var tipoChat = msg.chat.type;
    var userId = msg.from.id;
    var nameUser = msg.from.first_name;
    var date = msg.date;

    if (tipoChat == 'private'){
        if (getpermisos(msg)) {
            for(var i = 7; i < mensaje.length; i++){
                comunicado += mensaje[i];
            }
            bot.sendMessage(IDGRUPO, comunicado).then(function(m) {
                bot.pinChatMessage(IDGRUPO, m.message_id);
                console.log("[" + Date(date) + "] " + "Un administrador envió un mensaje, "  + nameUser + " ID: " + userId);
            })
            bot.deleteMessage(msg.chat.id, msg.message_id);
        }
    } 
    else if (tipoChat == 'supergroup' || tipoChat == 'group') {
        bot.sendMessage(chatId, "Este comando sólo funciona en privado.");
    }
}

// Muestra el id del usuario que hace la petición:
function getMyId(msg) {
    var myId = msg.from.id;
    var userName = msg.from.first_name;
    var chatId = msg.chat.id;
    var tipoChat = msg.chat.type;
    var date = msg.date;

    if (tipoChat == 'private'){
        bot.sendMessage(chatId, "Tu id es: " + myId);
        console.log("[" + Date(date) + "] " + userName + "(" + myId + "): Ha usado el comando /myid.");
    } 
    else if (tipoChat == 'supergroup' || tipoChat == 'group') {
        bot.sendMessage(chatId, "Este comando sólo funciona en privado.");
    }
}

// Añadir un administrador:
function setAdmin(msg) {
    var chatId = msg.chat.id;
    var userName = msg.from.first_name;
    var myId = msg.from.id;
    var date = msg.date;
    var tipoChat = msg.chat.type;
    var mensaje = msg.text;
    var id = '';
    
    if (tipoChat == 'private'){
        if (getpermisos(msg)) {
            if(mensaje[7] != " ") {
                bot.sendMessage(chatId, "Error al añadir el administrador. Comprueba que el ID es correcto.");
                console.log("[" + Date(date) + "] " + userName + "(" + myId + "): Error al añadir un nuevo administrador.");
            }
            else {
                for(var i = 8; i < mensaje.length; i++){
                    id += mensaje[i];
                }
                _private.setAdmin(id);
                bot.sendMessage(chatId, "Se ha añadido el nuevo administrador: " + id);
                console.log("[" + Date(date) + "] " + userName + "(" + myId + "): Ha añadido el nuevo administrador: " + id);
            }
        }
        else {
            bot.sendMessage(chatId, "Lo siento " + userName + ", no eres administrador.");
        }
    }
    else if (tipoChat == 'supergroup' || tipoChat == 'group') {
        bot.sendMessage(chatId, "Este comando sólo funciona en privado.");
    }
}

// Hace un ping:
function doPing(msg){
    var chatId = msg.chat.id;
    var tipoChat = msg.chat.type;
    var userName = msg.from.first_name;
    var userId = msg.from.id;
    var date = msg.date;

    if (getpermisos(msg)){
        if (tipoChat == 'private'){
            bot.sendMessage(chatId, "Pong 🏓");
            console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /ping.");
        } 
        else if (tipoChat == 'supergroup' || tipoChat == 'group') {
            bot.sendMessage(chatId, "Este comando sólo funciona en privado.");
        }
    }
}

//Envía el himno de DSK:
function getHimno(msg){
    var chatId = msg.chat.id;
    //var tipoChat = msg.chat.type;
    var userName = msg.from.first_name;
    var userId = msg.from.id; 
    var date = msg.date;

    if (getpermisos(msg)) {
        bot.sendAudio(IDGRUPO,"./src/audio/himnoDSK.mp3",{caption: "Himno oficial de DSK (sustituir 'In the navy' por 'Diskoporro')."});
        console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha usado el comando /himno."); 
    }
    else {
        bot.sendMessage(chatId, "Lo siento " + userName + ", no eres administrador.");
    }
}
// Encía los estatutos y reglamento del régimen interno de Diskobolo:
function getEstatutos(msg){
    var chatId = msg.chat.id;
    var tipoChat = msg.chat.type;
    var userName = msg.from.first_name; 

    if (getpermisos(msg)) {
        if (tipoChat == 'private'){
            bot.sendMessage(chatId, "<b>Selecciona una opción:</b> \n\n(Recuerda que los estatutos son como 'la constitución' y el reglamento como 'las leyes'. \nEl reglamento no puede contradecir los estatutos).",
            {
               reply_markup: {
                   inline_keyboard: [
                    [
                        {
                            text:"Estatutos", callback_data: 'estatutos',
                        },
                        {
                            text:"Reglamento del Régimen Interno", callback_data: 'reglamento',
                        }
                    ]
                ]
               },
               parse_mode:"HTML",
            });   
        } 
        else if (tipoChat == 'supergroup' || tipoChat == 'group') {
            bot.sendMessage(chatId, "Este comando sólo funciona en privado.");
        }
        
    }
    else {
        bot.sendMessage(chatId, "Lo siento " + userName + ", no eres administrador.");
    }
}

function sendEstatutos(msg){
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    var userName = msg.from.first_name;
    var date = msg.date;

    bot.sendDocument(chatId, "./src/documents/Estatutos_Diskobolo.pdf",{caption: "Estatutos de la Asociación Diskobolo."});
    console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha solicitado los estatutos.");
}

function sendReglamento(msg){
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    var userName = msg.from.first_name;
    var date = msg.date;

    bot.sendDocument(chatId, "./src/documents/Reglamento_del_Régimen_interno_DSK_v2019.pdf",{caption: "Reglamento del régimen interno de la Asociación Diskobolo."});
    console.log("[" + Date(date) + "] " + userName + "(" + userId + "): Ha solicitado el reglamento del régimen interno.");
}

/* *** */
























// Detección de palabras reservadas (OLD):
/*
bot.onText(palabradiskobolo, function(msg){
    bot.sendMessage(msg.chat.id, "Diskoporro*");
});
bot.onText(palabraexamen, function(msg){
    bot.sendMessage(msg.chat.id, "Parece que intentas suicidarte, ¿necesitas ayuda? 🙃");
});
bot.onText([palabraironman, 'IRONMAN', 'ironman', 'IronMan', 'IRON MAN'], function(msg){
    bot.sendAudio(msg.chat.id,"",{caption : "Y yo... soy Iron Man."});
});
bot.onText([palabrathanos, 'THANOS'], function(msg){
    bot.sendAudio(msg.chat.id,"",{caption : "Yo soy INEVITABLE."});
});
bot.onText(palabranuclear, function(msg){
    bot.sendAudio(msg.chat.id,"",{caption : "Nucelar, la palabra es nucelar."});
});
bot.onText(palabrapython, function(msg){
    bot.sendMessage(msg.chat.id, "Ha dicho Python 🤮");
});
bot.onText(palabrajava, function(msg){
    bot.sendMessage(msg.chat.id, "Intenté ligar con una informática, pero no sé deJAVA (ba dum chss...)");
});
bot.onText(palabradebian, function(msg){
    bot.sendMessage(msg.chat.id, "Hola caracola 🐚");
});
bot.onText(palabrawindows, function(msg){
 bot.sendMessage(msg.chat.id, "¡Windows días! 🪟");
});
bot.onText(palabralloro, function(msg){
    bot.sendMessage(msg.chat.id, msg.chat.first_name + " deja de llorar.");
});
*/