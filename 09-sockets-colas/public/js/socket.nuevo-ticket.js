// Establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

/*
Agrega el ultimo ticket a la pagina de nuevo ticket
*/
socket.on('estadoActual', function(resp) {

    console.table(resp);
    label.text(resp.actual);
});




/*

Pasa el siguiente ticket y cambia la imagen del label
*/
$('button').on('click', function() {

    socket.emit('siguienteTikect', null, function(siguienteTicket) {

        label.text(siguienteTicket);
    });

});