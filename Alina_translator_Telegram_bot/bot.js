/*
  "name": "alina_bot",
  "version": "2.0.0",
  "description": "Text translation bot",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Fernando Méndez (https://fermdez.ddns.net | @HumperCobra)",
  "license": "Educational Community License v2.0 (ECL-2.0)",
}

*/

/* Bot token and API */
const TelegramBot = require('node-telegram-bot-api');
const _private = require('./private.js');
const token = _private.token();
const bot = new TelegramBot(token, {polling:true});


/* Translator */
//const translate = require('translate-api');
const translate = require('@vitalets/google-translate-api'); //https://www.npmjs.com/package/@vitalets/google-translate-api
//const translate = require('google-translate-api');

// To overwrite the users.json file:
const fs = require('fs');
// File with user information:
const usersFile = require("./users.json");
// Stores user IDs read from "usuers.json":
const _users = JSON.parse(JSON.stringify(usersFile.users));


bot.on('polling_error', function(error){
    console.log(error);
});

bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    var userId = msg.from.id;
    var userIndex = indexOfArray(msg.from);
    if(userIndex === -1){
        addUser(msg.from);
        //updateUsers();
    }
    
    bot.sendMessage(chatId, "Welcome " + nameUser + "!\n\nI am a text translation bot created by *Fernando* (https://fermdez.ddns.net/en-UK/)."
                            + "\n\nUse the command */translator* to change languages.", {parse_mode: 'Markdown'});
    console.log("User /start: " + nameUser + ", Id: " + userId);

});

// Author:
bot.onText(/^\/author/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    var userId = msg.from.id;
    var date = msg.date;

    bot.sendMessage(chatId, "Author👤: *Fernando Méndez 'Humpercobra'* \n" +
                                    "Website🌐: https://fermdez.ddns.net/en-UK/", {parse_mode : "Markdown"});

    console.log("[" + Date(date) + "] " + nameUser + " (" + userId + "): Ha solicitado el autor.");
});

// Traductor command:
bot.onText(/^\/translator/, function(msg){
    translator(msg);
});

/* Translator */
bot.on('message', (msg) => {
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    //updateUsers();
    var userIndex = indexOfArray(msg.from);
    

    if(userIndex === -1){
        addUser(msg.from);
        bot.sendMessage(chatId, "Welcome *"+nameUser+"*!" + "\nWe have just added you to the list of users. \n\nChoose the language you want to translate with the command: */translator*.", {parse_mode: 'Markdown'});   
    }
    else{
        if(msg.text.includes('Spanish[🇪🇸]') || msg.text.includes('English[🇬🇧]') || msg.text.includes('Russian[🇷🇺]')){
            switch(msg.text){
                case 'Spanish[🇪🇸] --> English[🇬🇧]': //_from='es'; _to='en';
                    _users[userIndex].from='es'; _users[userIndex].to='en';
                    updateUsers();
                    bot.sendMessage(chatId, "*"+nameUser+"*" + ", now I will translate the texts from *Spanish*🇪🇸 to *English*🇬🇧.", {parse_mode: 'Markdown'});
                    break ;
                case 'English[🇬🇧] --> Spanish[🇪🇸]': //_from='en'; _to='es';
                    _users[userIndex].from='en'; _users[userIndex].to='es';
                    updateUsers();
                    bot.sendMessage(chatId, "*"+nameUser+"*" + ", now I will translate the texts from *English*🇬🇧 to *Spanish*🇪🇸.", {parse_mode: 'Markdown'});
                    break ;
                case 'Spanish[🇪🇸] --> Russian[🇷🇺]': //_from='es'; _to='ru';
                    _users[userIndex].from='es'; _users[userIndex].to='ru';
                    updateUsers();
                    bot.sendMessage(chatId, "*"+nameUser+"*" + ", now I will translate the texts from *Spanish*🇪🇸 to *Russian*🇷🇺.", {parse_mode: 'Markdown'});
                    break ;
                case 'Russian[🇷🇺] --> Spanish[🇪🇸]': //_from='ru'; _to='es';
                    _users[userIndex].from='ru'; _users[userIndex].to='es';
                    updateUsers();
                    bot.sendMessage(chatId, "*"+nameUser+"*" + ", now I will translate the texts from *Russian*🇷🇺 to *Spanish*🇪🇸.", {parse_mode: 'Markdown'});
                    break ;
                case 'English[🇬🇧] --> Russian[🇷🇺]': //_from='en'; _to='ru';
                    _users[userIndex].from='en'; _users[userIndex].to='ru';
                    updateUsers();
                    bot.sendMessage(chatId, "*"+nameUser+"*" + ", now I will translate the texts from *English*🇬🇧 to *Russian*🇷🇺.", {parse_mode: 'Markdown'});
                    break ;
                case 'Russian[🇷🇺] --> English[🇬🇧]': //_from='ru'; _to='en';
                    _users[userIndex].from='ru'; _users[userIndex].to='en';
                    updateUsers();
                    bot.sendMessage(chatId, "*"+nameUser+"*" + ", now I will translate the texts from *Russian*🇷🇺 to *English*🇬🇧.", {parse_mode: 'Markdown'});
                    break ;
            }
        } else if(!msg.text.includes('/') && userIndex != -1){
            traduce(msg);
        }
    }
});

function translator(msg){
    var chatId = msg.chat.id;
    
    bot.sendMessage(chatId, "<b>Choose an option: </b> 🇪🇸 🇬🇧 🇷🇺",
    {
    reply_markup: {
        keyboard: [
            [
                {
                    text:"Spanish[🇪🇸] --> English[🇬🇧]", callback_data: 'es_en',
                },
                {
                    text:"English[🇬🇧] --> Spanish[🇪🇸]", callback_data: 'en_es',
                }
            ],
            [
                {
                    text:"Spanish[🇪🇸] --> Russian[🇷🇺]", callback_data: 'es_ru',
                },
                {
                    text:"Russian[🇷🇺] --> Spanish[🇪🇸]", callback_data: 'ru_es',
                }
            ],
            [
                {
                    text:"English[🇬🇧] --> Russian[🇷🇺]", callback_data: 'es_ru',
                },
                {
                    text:"Russian[🇷🇺] --> English[🇬🇧]", callback_data: 'ru_es',
                }
            ]
        ]
    },
    parse_mode:"HTML",
    });
}

function traduce(msg){
    var chatId = msg.chat.id;
    var message = msg.text;
    //var tipoChat = msg.chat.type;

    var userIndex = indexOfArray(msg.from);
    /* if(userIndex === -1){
        addUser(msg.from);
        userIndex = indexOfArray(msg.from);
    } */
    var _from = _users[userIndex].from;
    var _to = _users[userIndex].to;


    /* Without Google-API */
    translate(message, {from: _from, to: _to}).then(res => {
        if(res.from.text.didYouMean){
            translate(res.from.text.value, {from: _from, to: _to}).then(resFixed => {
                bot.sendMessage(chatId, "I have corrected a possible typing error: \n\n" + res.from.text.value + "\n\n-----\n\nTraduction: \n\n" + resFixed.text);
                console.log("Bot auto-corrected --> " + message + " : " + resFixed.text);
            });
        }
        else{
            bot.sendMessage(chatId, res.text);
            console.log("Bot traduce --> " + message + " : " + res.text);
        }
    }).catch(err => {
        console.error(err);
    });

}

function addUser(newUser){
    let userToSave;
    var index = indexOfArray(newUser);
    var _from = newUser.language_code;
    var _to = 'en';

    newUser.from = _from;
    newUser.to = _to; 

    if (index === -1){
        _users.push(newUser);
        userToSave = {users:_users};
        fs.writeFile('./users.json', JSON.stringify(userToSave), 'utf8', (err) => {
            if (err) /*throw err*/  console.log('ERROR: no se ha actualizado la lista de Usuarios.');
        });
        console.log(newUser + ' Usuario nuevo añadido la base de datos.');
    } else if (index > -1){
        console.log(newUser + ' Ya existe el usuario en la base de datos.');
    }
}

function updateUsers(){
    let userToSave = {users:_users};
    fs.writeFile('./users.json', JSON.stringify(userToSave), 'utf8', (err) => {
        if (err) /*throw err*/  console.log('ERROR: no se ha actualizado la lista de Usuarios.');
    });

}

function indexOfArray(_user){
    var encontrado = false;
    var index = 0;
    var i = 0;
    
    if(_users.length === 0){
        index = -1;
    } else {
        while(!encontrado && i < _users.length){
            index = _users.findIndex(function (_user) {
                if(i > 0) return _users[i].id === _user.id;
            });
            if(index != -1){
                encontrado = true;
            } else {
                i++;
            }
        }
    }

    return index;
}
