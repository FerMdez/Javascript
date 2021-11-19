/*
{
  "name": "FDIeSports_bot",
  "version": "1.0.0",
  "description": "Bot oficial de la agrupación de esports de la Facultad de Informática de la Universidad Complutense de Madrid.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Fernando Méndez Torrubiano",
  "license": "Educational Community License v2.0 (ECL-2.0)",
  "dependencies": {
    "node-telegram-bot-api": "^0.51.0"
  }
}
*/
// Importar las librerías:
const TelegramBot = require('node-telegram-bot-api');
// Token del bot:
const token = '';
// Create the bot:
const bot = new TelegramBot(token, {polling:true});

// Palabras reservadas:
//const _despacho = new RegExp(/\b([Dd]espacho)\b/);


// Captura de errores:
bot.on('polling_error', function(error){
    console.log(error);
});

// Inicio del bot:
bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    bot.sendMessage(chatId, "*Bienvenido al bot de asistencia de FDIeSports*, " + "*"+nameUser+"*" + ".", {parse_mode : "Markdown"});
    bot.sendPhoto(chatId, "https://esports.fdi.ucm.es/images/LOGO.png",
                {caption: "Nacida como una agrupación de equipos de eSports para la Facultad de Informática y formada por alumnos de toda la Universidad Complutense de Madrid.\n" +
                "FDIeSports está respaldada por la histórica Asociación Diskóbolo."});

    menu(msg);
});

// Llama al menú interactivo de ayuda:
bot.onText(/^\/help/, (msg) => {
   menu(msg);
});

// Menú interactivo de ayuda:
function menu(msg){
    var chatId = msg.chat.id;

    bot.sendMessage(chatId, "<b>Selecciona una opción</b> (escribe /help para volver a mostrar este menú): ",
    {
       reply_markup: {
           inline_keyboard: [
            [
                {
                    text:"Grupos de Whatsapp de los equipos📱", callback_data: 'grupos'
                }
            ],
            [
               {
                //text:"Inscripción", callback_data: 'registro'
                text:"Inscripción👤", url: "https://esports.fdi.ucm.es/registro"
               },
               {
                text:"Despacho📍", callback_data: 'despacho'
               }
            ],
            [
               {
                text:"Redes Sociales💙", callback_data: 'redes'
               }
            ],
            [
                {
                    text:"Contacto📞", url: "https://esports.fdi.ucm.es/#four"
                }
            ],
        ]
       },
       parse_mode:"HTML",
    });
}

// Respuestas a la pulsación de botones:
bot.on('callback_query', function onCallbackQuery(accionboton){
    const data = accionboton.data;
    const msg = accionboton.message;
    var chatId = msg.chat.id;

    if(data == 'grupos'){
        whatsapp(msg);
    }

    if(data == 'registro'){
        registrar(msg);
    }

    if(data == 'despacho'){
        bot.sendMessage(chatId, "Aquí tienes la localización del despacho de *Diskobolo/FDIeSports*:", {parse_mode: "Markdown"});
        bot.sendLocation(chatId, 40.45365669535852, -3.73307118835828177);
    }

    if(data == 'redes'){
        redes(msg);
    }

});

// Registro de usuario en la base de datos (EN DESARROLLO):
function registrar(msg){
    var opts = {
    reply_markup: JSON.stringify({
        keyboard: [
        [{text: 'Enviar datos', request_contact: true}],
        [{text: 'Cancelar', request_contact: false}],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
    };
    bot.sendMessage(msg.chat.id, 'Formulario de registro: ', opts);
    bot.on('contact', (msg) => {
        console.log("Nombre: " + msg.contact.first_name /*+ "\nApodo: " + msg.contact.username*/ + "\nUserID:"  +  msg.contact.user_id + "\nNúmero Telf: " + msg.contact.phone_number);
        bot.sendMessage(msg.chat.id, "*"+msg.contact.first_name+"*" + ", *te has registrado en FDIeSports, correctamente*.", {parse_mode: "Markdown"});
        whatsapp(msg);
    });
}

// Muestra los grupos de Whastapp de los equipos:
function whatsapp(msg){
    bot.sendMessage(msg.chat.id, "Seleccione el equipo al que quiere unirse: ", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Equipo de LOL", url: "https://chat.whatsapp.com/5enTKgyYdefKNBpBq10igX"}
                ],
                [
                    {text: "Equipo de CSGO", url: "https://chat.whatsapp.com/CZJZshnndo6AUSveLMh2e1X"},
                    {text: "Equipo de OverWatch", url: "https://chat.whatsapp.com/3dN1UvXj6WO3oeqIMTWHW2"}
                ],
                [
                    {text: "Equipo de Valorant", url: "https://chat.whatsapp.com/E2J2WgW676TKZB8el8ODyo"}
                ]
            ]
        }
    });
}

// Muestra las redes sociales de FDIeSports:
function redes(msg){
    bot.sendMessage(msg.chat.id, "*Síguenos* en nuestras principales redes sociales: ", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Discord🎧", url: "https://discordapp.com/invite/zjAdrfz"}
                ],
                [
                    {text: "Twitter🐦", url: "https://twitter.com/FDIeSports"},
                    {text: "Web🌐", url: "https://esports.fdi.ucm.es/"}
                ],
            ]
        },
        parse_mode: "Markdown",
    });
}

bot.onText(/^\/author/, function(msg){
    var chatId = msg.chat.id;

    bot.sendMessage(chatId, "Autor👤: *Fernando Méndez 'Humpercobra'* \n" +
                                    "Web🌐: https://fermdez.ddns.net", {parse_mode : "Markdown"})
});
