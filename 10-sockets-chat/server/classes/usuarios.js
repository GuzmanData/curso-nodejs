class Usuarios {


    constructor() {
        this.personas = [];
    }



    // Agregar una persona a la lista de personas 
    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        console.log(this.personas);

        return this.personas;

    }


    // Buscar una persona de la lista por el id
    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }


    // retornar todas las personas de la lista
    getPersonas() {
        return this.personas;
    }


    getPersonasPorSala(sala) {

        const personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala
        });

        console.log(personasEnSala);

        return personasEnSala;



    }


    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        });


        return personaBorrada;
    }


}

module.exports = {
    Usuarios
}