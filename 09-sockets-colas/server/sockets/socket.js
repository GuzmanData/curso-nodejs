const { io } = require('../server');
const { TicketControl } = require('../clasess/ticker-controls');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTikect', (data, callback) => {
        let siguiente = ticketControl.siguienteTikect();
        callback(siguiente);
    });


    // Devuelve el ultimo el ultimo ticket generado
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {

        // Validamos que venga un número de escritorio
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }


        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket)


        // Actualizat / notificar cambios en los ultimos 4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });



    });



});