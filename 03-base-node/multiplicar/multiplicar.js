// requireds
const fs = require('fs');
const colors = require('colors');





let listarTabla = (base, limite = 10) => {

    return new Promise((resolve, reject) => {


        console.log('================================');
        console.log(`tabla de ${base}`.green);
        console.log('================================');

        // Validamos que la base sea un número
        if (!Number(base)) {
            reject(`El valor intrudcido "${base}" no es un numero`);
            return;
        }

        for (let i = 1; i <= limite; i++) {
            console.log(`${base} * ${i} = ${base * i}\n`);
        }

    });

}

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {

        // Validamos que la base sea un número
        if (!Number(base)) {
            reject(`El valor intrudcido "${base}" no es un numero`);
            return;
        }

        let data = '';

        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}\n`;
        }


        // Se escribe la tabla de multiplicar en el archivo
        fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
            if (err) reject(err);
            else
                resolve(`tabla-${base}.txt`)

        })

    });
}


module.exports = {
    crearArchivo,
    listarTabla
}