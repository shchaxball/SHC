# SHC API
Haxball Headless Host

# Como INICIAR: 
```javascript
// Pegar codigo de la api.

Room.create({<propiedades>})
.then(() => {
    console.log("Sala creada.");
})
.catch(error => {
    console.log("Error: " + error);
});
```

# EJEMPLO:
```javascript
// El codigo de la api

Room.create({roomName: "Tu sala de haxball", public: true})
.then(() => {
    Room.onUserJoin = function(user) {
   if (user.name === "tu nombre") {
        Room.setUserAdmin(user.id); // Te dara admin.
      }
    }
    
    Room.onGoalScored = function (scorer) {
        Room.sendAnnounce("Gol de: " + scorer.name);
    }

    Room.commandPrefix = "!";

    Room.onCommand = function (user, command) {
        if (command == "!tuComando") {
            Room.sendAnnounce(user.name + " Ha ejecutado el comando !tuComando");
        }
    }

    Room.hideMessage = true;
    
    Room.onUserChat = function (user, message) {
        Room.sendAnnounce(user.name + ": " + message, null, 0x00FF00);
    }
})
.catch(error => {
    console.log("Error: " + error);
});
```

# DOCUMENTACION

## Funciones:

### **Create({Propiedades});**
Esta función sirve para crear tu sala y modificarla a tu gusto.

Ejemplo:
```javascript
Room.Create({roomName: "Tu sala de haxball", public: true}).then(() => {
    Room.afterRoomLink = function(URL) {
        console.log("Paso un segundo después de crear la sala. Link: " + URL);
    }
}).catch(error => {
    console.error(error);
});
```

### **onUserJoin(user);**
Se llama cuando un jugador se une a la sala.

Ejemplo:
```javascript
Room.onUserJoin = function(user) {
    console.log(user.name + " se ha unido a la sala.");
};
```

### **onUserLeave(user);**
Se llama cuando un jugador abandona la sala.

Ejemplo:
```javascript
Room.onUserLeave = function(user) {
    console.log(user.name + " ha abandonado la sala.");
};
```
### **everyTick();**
Se llama en cada cuadro/tick del juego.

Ejemplo:
```javascript
Room.everyTick = function() {
    // Código que se ejecuta en cada tick del juego.
};
```

### **onUserChat(user, message);**
Se llama cuando un usuario envía un mensaje en el chat.

Ejemplo:
```javascript
Room.onUserChat = function(user, message) {
    console.log(user.name + " dijo: " + message);
};
```

### **onUserCommand(user, command);**
Se llama cuando un usuario ejecuta un comando.

Ejemplo:
```javascript
Room.onUserCommand = function(user, command) {
    console.log(user.name + " ejecutó el comando: " + command);
};
```

### **onCustomStadium(stadiumCode);**
Se llama cuando se establece un estadio personalizado.

Ejemplo:
```javascript
Room.onCustomStadium = function(stadiumCode) {
    console.log("Estadio personalizado cargado.");
};
```

### **onDefaultStadium();**
Se llama cuando se establece un estadio por defecto.

Ejemplo:
```javascript
Room.onDefaultStadium = function() {
    console.log("Estadio por defecto establecido.");
};
```

### **onUserAdmin(changedPlayer, byUser);**
Se llama cuando un usuario recibe o pierde derechos de administrador.

Ejemplo:
```javascript
Room.onUserAdmin = function(changedPlayer, byUser) {
    console.log(changedPlayer.name + " ahora es admin.");
};
```

### **onGameVictory(scores);**
Se llama al final de un partido, cuando se determina un ganador.

Ejemplo:
```javascript
Room.onGameVictory = function(scores) {
    console.log("Partido terminado. Resultado: " + scores.red + " - " + scores.blue);
};
```

### **onGoalScored(scorer);**
Se llama cuando se anota un gol.

Ejemplo:
```javascript
Room.onGoalScored = function(scorer) {
    console.log("Gol anotado por: " + scorer.name);
};
```

### **onBallKick(player);**
Se llama cuando un jugador golpea el balón.

Ejemplo:
```javascript
Room.onBallKick = function(player) {
    console.log(player.name + " ha golpeado el balón.");
};
```

### **onUserTeamChange(changedPlayer, byPlayer);**
Se llama cuando un jugador cambia de equipo.

Ejemplo:
```javascript
Room.onUserTeamChange = function(changedPlayer, byPlayer) {
    console.log(changedPlayer.name + " ha cambiado de equipo.");
};
```

### **onUserKicked(kickedPlayer, byPlayer);**
Se llama cuando un jugador es expulsado de la sala.

Ejemplo:
```javascript
Room.onUserKicked = function(kickedPlayer, byPlayer) {
    console.log(kickedPlayer.name + " fue expulsado por " + byPlayer.name);
};
```

### **onPause(byPlayer);**
Se llama cuando el juego se pausa.

Ejemplo:
```javascript
Room.onPause = function(byPlayer) {
    console.log("El juego ha sido pausado por " + byPlayer.name);
};
```

### **onUnpause(byPlayer);**
Se llama cuando el juego se reanuda después de una pausa.

Ejemplo:
```javascript
Room.onUnpause = function(byPlayer) {
    console.log("El juego ha sido reanudado por " + byPlayer.name);
};
```

### **onPositions();**
Se llama cuando las posiciones de los jugadores y el balón se restablecen a su estado inicial.

Ejemplo:
```javascript
Room.onPositions = function() {
    console.log("Posiciones restablecidas.");
};
```

### **onAllStadiumChange(newStadiumName, byPlayer);**
Se llama cuando el estadio es cambiado.

Ejemplo:
```javascript
Room.onAllStadiumChange = function(newStadiumName, byPlayer) {
    console.log("Estadio cambiado a " + newStadiumName + " por " + byPlayer.name);
};
```
### **onTeamLock(boolean, byUser);**
Se llama cuando un jugador lockea los equipos.

Ejemplo:
```javascript
Room.onTeamLock = function(boolean, byUser) {
    console.log(user.name + " ha puesto teamLocks en" + boolean + ".");
};
```

### **commandPrefix**
El prefix de los comandos.

Ejemplo:
```javascript
Room.commandPrefix = "!";
```

### **hideMessage**
Define si se esconde el mensaje de onUserChat.

Ejemplo:
```javascript
Room.hideMessage = true;
```


### **sendAnnounce(message, user, color, font, sound);**
Envía un anuncio en la sala. Puedes especificar el usuario, el color, la fuente y el sonido del mensaje.

Ejemplo:
```javascript
Room.sendAnnounce("Bienvenido a la sala", user.id, 0xFF0000, "bold", 0);
```

### **setUserTeam(user, team);**
Cambia el equipo de un usuario.

Ejemplo:
```javascript
Room.setUserTeam(user.id, 1); // Cambia al equipo rojo
Room.setUserTeam(user.id, 2); // Cambia al equipo azul
```

### **kickUser(user, reason, ban);**
Expulsa a un usuario de la sala. Opcionalmente, puedes banearlo.

Ejemplo:
```javascript
Room.kickUser(user.id, "Razón del kick", false); // Expulsa sin ban
Room.kickUser(user.id, "Razón del ban", true); // Expulsa y banea
```

### **onGameStart(byPlayer);**
Se llama cuando el juego comienza.

Ejemplo:
```javascript
Room.onStart = function(byPlayer) {
    console.log("El juego ha comenzado.");
};
```

### **onGameStop(byPlayer);**
Se llama cuando el juego termina.

Ejemplo:
```javascript
Room.onStop = function(byPlayer) {
    console.log("El juego ha terminado.");
};
```

### **startRec();**
Inicia la grabación del partido. El archivo de grabación se guardará en el servidor.

Ejemplo:
```javascript
Room.startRec();
```

### **stopRec();**
Detiene la grabación del partido y devuelve la grabación.

Ejemplo:
```javascript
let recording = Room.stopRec();
```

### **setRoomPassword(contraseña);**
Establece una contraseña para la sala. Solo los usuarios que conozcan la contraseña podrán unirse.

Ejemplo:
```javascript
Room.setRoomPassword("miContraseñaSecreta");
```

### **clearRoomPassword();**
Elimina la contraseña de la sala, permitiendo que cualquiera se una sin necesidad de una contraseña.

Ejemplo:
```javascript
Room.clearRoomPassword();
```

### **setRoomCaptcha(booleano);**
Activa o desactiva la necesidad de completar un CAPTCHA para unirse a la sala.

Ejemplo:
```javascript
Room.setRoomCaptcha(true);
```

### **setUserAvatar(idUsuario, avatar);**
Establece un avatar personalizado para un usuario.

Ejemplo:
```javascript
Room.setUserAvatar(1, "url_del_avatar");
```

### **editDisc(idDisco, propiedades);**
Edita las propiedades de un disco en el estadio (incluyendo el balón).

Ejemplo:
```javascript
Room.editDisc(0, {radius: 15}); // Cambia el radio del balón.
```

### **getDisc(idDisco);**
Obtiene las propiedades de un disco específico.

Ejemplo:
```javascript
let discProperties = Room.getDisc(0);
```

### **editPlayerDisc(idUsuario, propiedades);**
Edita las propiedades del disco asociado a un jugador.

Ejemplo:
```javascript
Room.editPlayerDisc(1, {radius: 20});
```

### **getPlayerDisc(idUsuario);**
Obtiene las propiedades del disco asociado a un jugador.

Ejemplo:
```javascript
let playerDisc = Room.getPlayerDisc(1);
```

### **getDiscs();**
Obtiene el número de discos en el estadio.

Ejemplo:
```javascript
let discCount = Room.getDiscs();
```

### **getCollisions();**
Obtiene información sobre las colisiones en el juego.

Ejemplo:
```javascript
let collisions = Room.getCollisions();
```

### **exportStadium();**
Exporta el código del estadio actual.

Ejemplo:
```javascript
let stadiumCode = Room.exportStadium();
```

### **exportColors(equipo);**
Exporta la configuración de colores de un equipo específico.

Ejemplo:
```javascript
let teamColors = Room.exportColors(1); // Colores del equipo rojo.
```
### **onEditPlayerDisc(usuario, propiedades);**
Se llama cuando se edita las propiedades de el jugador.

Ejemplo:
```javascript
Room.onEditPlayerDisc = function(usuario, propiedades) {
    // funciones
};
```


### **onEditDisc(disco, propiedades);**
Se llama cuando se edita las propiedades de el disco.

Ejemplo:
```javascript
Room.onEditDisc = function(disco, propiedades) {
    // funciones
};
```

### **setCustomStadium(código);**
Establece un estadio personalizado utilizando el código del estadio. Esto cambiará el estadio actual al que se define en el código proporcionado.

Ejemplo:
```javascript
Room.setCustomStadium("CÓDIGO_DEL_ESTADIO");
```

### **setDefaultStadium(nombreEstadio);**
Establece el estadio predeterminado utilizando el nombre del estadio. Esto cambiará el estadio actual al estadio predeterminado especificado.

Ejemplo:
```javascript
Room.setDefaultStadium("Big");
```

### **setUserAdmin(idUsuario, booleano);**
Asigna o revoca derechos de administrador a un usuario en la sala. El parámetro booleano determina si se otorga (`true`) o se revoca (`false`) el estado de administrador.

Ejemplo:
```javascript
Room.setUserAdmin(1, true); // Otorga derechos de administrador al usuario con ID 1.
```

### **setUserTeam(idUsuario, equipo);**
Asigna a un usuario a un equipo específico. Los equipos generalmente son `1` para el equipo rojo y `2` para el equipo azul.

Ejemplo:
```javascript
Room.setUserTeam(1, 1); // Asigna al usuario con ID 1 al equipo rojo.
```

### **kickUser(idUsuario, razón, ban);**
Expulsa a un usuario de la sala. Si `ban` es `true`, el usuario también será baneado.

Ejemplo:
```javascript
Room.kickUser(1, "Comportamiento inapropiado", false);
```

### **clearBanToUser(idUsuario);**
Desbanea a un usuario previamente baneado.

Ejemplo:
```javascript
Room.clearBanToUser(1);
```

### **clearAllBans();**
Desbanea a todos los usuarios previamente baneados en la sala.

Ejemplo:
```javascript
Room.clearAllBans();
```


### **onClearBans();**
Se llama cuando se borran los baneos.

Ejemplo:
```javascript
Room.onClearBans = function() {
    // funciones
};
```

### **setGoalsLimit(límiteGoles);**
Establece el límite de goles para el partido actual.

Ejemplo:
```javascript
Room.setGoalsLimit(3);
```

### **setMaxTime(tiempoMáximo);**
Establece el tiempo máximo para el partido actual.

Ejemplo:
```javascript
Room.setMaxTime(5);
```

### **setTeamsLock(bloqueo);**
Bloquea o desbloquea los cambios de equipo. `true` para bloquear, `false` para desbloquear.

Ejemplo:
```javascript
Room.setTeamsLock(true);
```

### **startGame();**
Inicia el partido actual.

Ejemplo:
```javascript
Room.startGame();
```


### **setColors(team, angulo, [avatarColor, colores])**
Cambia los colores de las camisetas.

Ejemplo:
```javascript
Room.setColors(1, 90, [0x000000, 0x0000FF, 0xFFFF00, 0x0000FF]);
```


### **stopGame();**
Detiene el partido actual.

Ejemplo:
```javascript
Room.stopGame();
```

### **pauseGame();**
Pausa el partido actual.

Ejemplo:
```javascript
Room.pauseGame();
```

### **unpauseGame();**
Reanuda el partido si está pausado.

Ejemplo:
```javascript
Room.unpauseGame();
```

### **getUser(idUsuario);**
Obtiene información sobre un usuario específico.

Ejemplo:
```javascript
let userInfo = Room.getUser(1);
```

### **getUserList();**
Obtiene una lista de todos los usuarios en la sala.

Ejemplo:
```javascript
let userList = Room.getUserList();
```

### **game();**
Obtiene información sobre el estado actual del juego.

Ejemplo:
```javascript
let gameState = Room.game();
```

### **getBallPosition();**
Obtiene la posición actual del balón.

Ejemplo:
```javascript
let ballPosition = Room.getBallPosition();
```

----------------------

# Discord:
https://discord.gg/9JecNUFFCv
