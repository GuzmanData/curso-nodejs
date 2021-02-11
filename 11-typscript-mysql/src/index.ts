import MySql from './mysql/mysql';
import router from './router/router';
import Server from './server/server';

const server = Server.init(3000);
server.app.use(router);

// connectar a la base de datos mySQL
// const mysql = new MySql();
// MySql.instance;


server.start(() =>{

    console.log("servidor corriendo en el puerto 3000");
});