const { argv } = require('./config/yargs');
const colors = require('colors');

const { crearTarea, getListado, actualizar, borrar } = require('./por-hacer/por-hacer');


let comando = argv._[0];


switch (comando) {
    case 'crear':
        let tarea = crearTarea(argv.descripcion);
        break;
    case 'listar':

        let listado = getListado();

        for (let tarea of listado) {
            console.log('======= por hacer ======='.green);
            console.log('       ' + tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('========================='.green);
        }


        break;
    case 'actualizar':

        let actualizado = actualizar(argv.descripcion, argv.completado)
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.error('Comando no es reconico');


}