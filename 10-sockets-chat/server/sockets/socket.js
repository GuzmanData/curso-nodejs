const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils')

const usuario = new Usuarios();

io.on('connection', (client) => {


    // Evento cuando una persona ingresa al chat
    client.on('entrarChat', (data, callback) => {


        console.log(data.nombre);
        console.log(data.sala);

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }


        client.join(data.sala);

        // agregamos esta persona al array de personas en el chat
        usuario.agregarPersona(client.id, data.nombre, data.sala);


        client.broadcast.to(data.sala).emit('listaPersona', usuario.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));


        callback(usuario.getPersonasPorSala(data.sala));

    });


    client.on('crearMensaje', (data, callback) => {

        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);


        callback(mensaje);


    });

    client.on('disconnect', () => {

        let personaBorrada = usuario.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuario.getPersonasPorSala(personaBorrada.sala));


    });


    // Mensaje privado
    client.on('mensajePrivado', data => {

        let persona = usuario.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

























});