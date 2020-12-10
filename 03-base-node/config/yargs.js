const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }

}

const argv = require('yargs')
    .command('Listar', 'Imprime en cosola la tabla de miltiplicar', opts)
    .command('Crear', 'Crea la tabla de miltiplicar', opts)
    .argv;


module.exports = {
    argv
}