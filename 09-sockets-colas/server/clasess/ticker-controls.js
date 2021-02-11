const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        // Número del ticket a atender
        this.numero = numero;
        // Escritorio responsable de atender el ticket
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        // Listado de tickets pendientes
        this.tickets = [];

        // ULtimos cuatro ticket pendientes, se mostraran el pantalla
        this.ultimos4 = [];

        let data = require('../data/data.json');
        data.hoy === this.hoy ? this.actualizarTicketsHoy(data) : this.reiniciarConteo();
    }


    getUltimoTicket() {

        return `Ticket ${this.ultimo}`

    }

    getUltimos4() {

        return this.ultimos4

    }

    siguienteTikect() {

        this.ultimo += 1;
        // Se crea un nuevo ticket
        let ticket = new Ticket(this.ultimo, null);

        // agregamos al arreglo de tickets pendientes
        this.tickets.push(ticket);


        this.grabarArchivo();
        return `Ticket ${this.ultimo}`
    }


    reiniciarConteo() {

        this.ultimo = 0;

        // Se reinica tickets pendientes
        this.tickets = []

        // se reincian los ultimos cuatro tickets
        this.ultimos4 = [];

        this.grabarArchivo();
    }



    // Guarda la información en el data.json
    grabarArchivo() {

        // Creamos el objeto con la estructura necesaria
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos: this.ultimos4
        }

        // convertimos en tipo string y guardamos el archivo
        const jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


    // Rstaura la información del mismo día en caso se caiga el servidor

    actualizarTicketsHoy(data) {

        this.ultimo = data.ultimo;
        this.tickets = data.tickets;
        this.ultimos4 = data.ultimos;
    }


    // función para atender el ticket generado
    // se pasa el número del escritorio encargado de atender
    atenderTicket(numeroEscritorio) {

        // validamos si exusten ticketes pendientes


        if (this.tickets.length === 0 || !this.ultimos4 === 0) return 'No hay tickets';



        // tomamos el número del primer ticket
        let numeroTicket = this.tickets[0].numero;

        // eliminamos el primer elemento de la lista de tickets pendientes
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, numeroEscritorio);

        // agregamos este ticket en el primer puesto de los ultimos cuatro
        this.ultimos4.unshift(atenderTicket);


        // en caso de que ya se superen los cautro ultimos tickets se borra 
        // el ultimo elemento del arreglo
        if (this.ultimos4.length > 4) this.ultimos4.splice(-1, 1)


        // guardamos en la base de datos ( en este caso el data.json)
        this.grabarArchivo();

        return atenderTicket;








    }

}






module.exports = {
    TicketControl
}