"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router/router"));
const server_1 = __importDefault(require("./server/server"));
const server = server_1.default.init(3000);
server.app.use(router_1.default);
// connectar a la base de datos mySQL
// const mysql = new MySql();
// MySql.instance;
server.start(() => {
    console.log("servidor corriendo en el puerto 3000");
});
