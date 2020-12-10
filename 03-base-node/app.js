 const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar')
 const argv = require('./config/yargs').argv;
 const colors = require('colors');

 const comando = argv._[0];

 switch (comando) {
     case 'listar':
         console.log('Listar');
         listarTabla(argv.base, argv.limite)
             .catch(e => console.log(e))
         break;
     case 'crear':
         console.log('Crear');
         crearArchivo(argv.base, argv.limite)
             .then(archivo => console.log(`Archivo creado: ${archivo}`))
             .catch(e => console.log(e));
         break;
     default:
         console.log('comando no reconocido');

 }



 // Obtener el valor de base que se pasa pro parametro
 //  let parametro = argv[2];
 //  let base = parametro.split("=")[1];


 // Ejecutar función para crear archivo