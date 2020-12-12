const fs = require('fs');


let listadoPorHacer = [];
let listaTareas = [];


const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('database/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabarla tarea', err);
    });
}


const cargarDb = () => {

    try {

        listadoPorHacer = require('../database/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}


const crearTarea = (descripcion) => {



    cargarDb();

    let porHacer = {
        descripcion,
        completado: false,

    };

    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;
}

const getListado = () => {
    cargarDb();
    return listadoPorHacer;


}

const actualizar = (descripcion, completado = true) => {


    cargarDb();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);



    if (index >= 0) {
        listadoPorHacer[index].completado = (completado === "true") ? true : false
        guardarDb();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDb();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDb();
        return true;
    } else {
        return false;
    }

}



module.exports = {
    crearTarea,
    cargarDb,
    getListado,
    actualizar,
    borrar

}