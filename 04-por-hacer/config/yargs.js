const optsCrear = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}

const optsActualizar = {
    descripcion: {
        demand: true,
        alias: 'd'
    },
    completado: {
        demand: true,
        alias: 'c',
        default: true
    }
}


const optsBorrar = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}

const argv = require('yargs')
    .command('actualizar', 'Actualiza el estado completado de una tarea', optsActualizar)
    .command('crear', 'Crear un elemento por hacer', optsCrear)
    .command('borrar', 'Borrar un elemento por hacer', optsBorrar)
    .argv;


module.exports = {
    argv
}