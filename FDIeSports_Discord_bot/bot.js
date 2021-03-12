// Librerías y dependendias:
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// Prefijo para comandos "/":
let prefix = config.prefix;



// Funciones del bot:
client.on('ready', () => {
    // Mensaje al iniciar el bot:
    console.log("[ " + Date() + " ] Se ha iniciado el bot.");

});

client.on('message', message => {
    // Ignoramos el contenido de los mensajes del BOT (evita bucle infinito):
    /* if (!message.content.startsWith('LOL') || !message.content.startsWith('CSGO')
    || !message.content.startsWith('VALORANT') || !message.content.startsWith('OVERWATCH')
    || !message.content.startsWith('TITANFALL') || !message.content.startsWith('FORNITE')
    || !message.content.startsWith('QUAKE')) return; */
    // if (message.author.bot) return;

    // Id del canal de bienvenida:
    var welcomeChanel = client.channels.cache.get(config.welcomeChanel);
    // Id del canal de administración:
    var adminChanel = client.channels.cache.get(config.adminChanel);
    // Rol que se va a asignar:
    var rol = message.guild.roles.cache.get(config.lolID);

    // Asignación del rol:
    if(message.channel == welcomeChanel){
        switch(message.content){
            case 'LOL': rol = message.guild.roles.cache.get(config.lolID);
                break;
            case 'CSGO': rol = message.guild.roles.cache.get(config.csgoID);
                break;
            case 'VALORANT': rol = message.guild.roles.cache.get(config.valorantID);
                break;
            case 'OVERWATCH': rol = message.guild.roles.cache.get(config.overwatchID);
                break;
            case 'TITANFALL': rol = message.guild.roles.cache.get(config.titanfallID);
                break;
            case 'FORNITE': rol = message.guild.roles.cache.get(config.forniteID);
                break;
            case 'QUAKE': rol = message.guild.roles.cache.get(config.quakeID);
                break;
        }
        if(message.content === 'LOL' || message.content === 'CSGO'
        || message.content === 'VALORANT' || message.content === 'OVERWATCH'
        || message.content === 'TITANFALL' || message.content === 'FORNITE' || message.content === 'QUAKE') {
            if(message.member.roles.cache.has(rol)) {
                message.channel.send('Ya tienes el rol asignado ');
                console.log("[ " + Date() + " ] Se ha interactuado con" + message.member.user.username  + " en #BIENVENIDA.");
            }
            else {
                message.member.roles.add(rol).catch(console.error); //Agregamos el rol al usuario
                message.channel.send(message.member.user.username + ' *¡Bienvenido al servidor de FDIeSports! 👋🏻* \n' +
                                    '⚠️ Usa los canales adecuados para hablar de cada tema y respeta a los demás. ⚠️ \n' +
                                    '👉 Se te ha asignado el rol: `'+rol.name+'` 👈\n\n' +
                                    '🐦 Puedes seguirnos en *twitter* : https://twitter.com/FDIeSports 🐦\n\n' +
                                    '🌍 Recuerda que si tienes cualquier duda, puedes consultar la web : *https://esports.fdi.ucm.es* 🌍\n', { parse_mode: 'Markdown' });
                console.log("[ " + Date() + " ] Se ha asignado un rol de rol a " + message.member.user.username );
            }
        }
        else if(!(message.member.roles.cache.has(rol.id))) {
            message.channel.send(message.member.user.username + ' escribe el nombre del equipo al que perteneces (en mayúsculas), para que se te asigne el rol.\n\n' +
            '*Roles disponibles*: LOL | CSGO | VALORANT | OVERWATCH | TITANFALL | FORNITE | QUAKE.', {parse_mode: 'Markdown'});
            console.log("[ " + Date() + " ] Se ha solicitado a " + message.member.user.username  + " que diga a qué equipo pertenece.");
        }

    }

    if(message.channel == adminChanel) {
        if(message.content.startsWith(prefix + 'ping')) {
        message.channel.send(`Pong 🏓`);
        }
    }

    if(message.content.startsWith(prefix + 'autor') || message.content.startsWith(prefix + 'author')){
        message.channel.send("Autor👤: *Fernando Méndez 'Humpercobra'* \n" +
                                "Web🌐: https://fermdez.ddns.net", {parse_mode : "Markdown"});
    }
});

client.login(config.BOT_TOKEN);