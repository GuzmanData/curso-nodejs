// Establecer la conexion
var socket = io();


// Obtener los parametros pasados por la url
var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

// validamos que el ecritorio venga como parametro
// en caso de no existir retorne al index.html
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}


// En caso de pasar la validación asignamos el escritorio a una variable
var escritorio = searchParams.get('escritorio');

// cambiamos el texto del escritorio
$('h1').text('Escritorio ' + escritorio);


// Listener del boton
$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {


        if (resp === 'No hay tickets') {
            label.text('Ticket: ' + resp);
            alert(resp);
            return;
        }
        label.text('Ticket: ' + resp.numero);
    });


});