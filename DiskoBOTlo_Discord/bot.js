// Librerías y dependendias:
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const mcping = require('mc-ping-updated');

// Prefijo para comandos "/":
let prefix = config.prefix;



// Funciones del bot:
client.on('ready', () => {
    // Mensaje al iniciar el bot:
    console.log("[ " + Date() + " ] Se ha iniciado el bot.");

});

client.on('message', message => {
  // Ignoramos el contenido de los mensajes del BOT (evita bucle infinito):
  // if (!message.content.startsWith(prefix)) return;
  // if (message.author.bot) return;

  // Id del canal de bienvenida:
  var welcomeChanel = client.channels.cache.get(config.welcomeChanel);
  // Id del canal de Minecraft:
  var serverMinecraftChanel = client.channels.cache.get(config.serverMinecraftChanel);
  //Id del canal de Junta:
  var juntaChanel = client.channels.cache.get(config.juntaChanel);

  // Id del rol "Suscriptor":
  //var socioRol = message.guild.roles.cache.find(r => r.name === "socioRol");
  var socioRol = message.guild.roles.cache.get(config.socioID);

  // Asignación del rol al decir "Hola" en el canal de bienvenida.
  if(message.channel == welcomeChanel){
    //console.log(message.content); 
    if(message.content === 'Hola'){
        if(message.member.roles.cache.has(socioRol.id)) {
          message.channel.send('Hola a ti también 😉');
          console.log("[ " + Date() + " ] Se ha interactuado con" + message.member.user.username  + " en #BIENVENIDA.");
        } 
        else {
          message.member.roles.add(socioRol).catch(console.error); //Agregamos el rol al usuario
          message.channel.send(message.member.user.username + ' *¡Bienvenido al servidor de Diskobolo!* 👋\n' +
                                '⚠️ Usa los canales adecuados para hablar de cada tema y respeta a los demás ⚠️\n' +
                                '👉 Se te ha asignado el rol: `'+socioRol.name+'` 👈.\n\n' +
                                '🐦 Puedes seguirnos en *twitter* 🐦: https://twitter.com/DSKbolo \n\n' +
                                '🔎 Recuerda la IP del servidor de Minecraft ⛏️: *diskobolo.fdi.ucm.es*\n', { parse_mode: 'Markdown' });
          console.log("[ " + Date() + " ] Se ha asignado un rol de socioRol a " + message.member.user.username );
        }
    } else if(!(message.member.roles.cache.has(socioRol.id))) {
        message.channel.send(message.member.user.username + ' escribe "Hola", para que se te asigne un rol.');
        console.log("[ " + Date() + " ] Se ha solicitado a " + message.member.user.username  + " que diga hola.");
    }
  }

    if(message.channel == juntaChanel || message.channel == serverMinecraftChanel) {
      if(message.content.startsWith(prefix + 'ping')) {
        message.channel.send(`pong 🏓`);
      }
      if(message.content.startsWith(prefix + 'minecraft')) {
        mcping('diskobolo.fdi.ucm.es', 25565, function(err, res) {
          if (err) {
              // Some kind of error
              message.channel.send('El servidor *NO* funciona. Puede que haya explotado un creeper 🤷‍♂️', { parse_mode: 'Markdown' });
              console.error("[ " + Date() + " ] " + message.member.user.username + " Error al mostrar el estado del servidor de Minecraft.\n\n" + err);
          } else {
              // Success!
              message.channel.send('⛏️*SERVIDOR DE MINECRAFT DE DISKOBOLO*⛏️ \n\n' +
                                    'Estado: *ACTIVO* \n' +
                                    'IP del servidor: *diskobolo.fdi.ucm.es* \n' +
                                    'Versión del servidor: *' + res.version.name + '* \n' +
                                    'Jugadores conectados: *' + res.players.online +'*', { parse_mode: 'Markdown' });
              console.log("[ " + Date() + " ] " + message.member.user.username + " Ha solicitado el estado del servidor de Minecraft. \n\n" + res)
              //console.log(res);
          }
      }, 3000);
      }
    } 

  if(message.content.startsWith(prefix + 'autor') || message.content.startsWith(prefix + 'author')){
    message.channel.send("Autor👤: *Fernando Méndez 'Humpercobra'* \n" +
    "Web🌐: https://fermdez.ddns.net", {parse_mode : "Markdown"});
  }
});

client.login(config.BOT_TOKEN);
