/**
 * Biblioteca Mongoose para conectarse a la base de datos MongoDB.
 * @module mongoose
 */

import mongoose from "mongoose";

/**
 * Dirección del host donde se encuentra la base de datos.
 * @constant {string}
 * @default
 */
const host = "localhost";

/**
 * Puerto en el que se ejecuta la base de datos.
 * Si la variable de entorno MONGO_PORT no está definida, se usará el puerto 27018 por defecto.
 * @constant {(string|number)}
 * @default
 */
const port = process.env.MONGO_PORT || 27021;

/**
 * Nombre de la base de datos a la que se desea conectar.
 * Si la variable de entorno MONGO_DB no está definida, se usará "sofscraping" por defecto.
 * @constant {string}
 * @default
 */
const db = process.env.MONGO_DB || "sofscraping";

/**
 * URL de conexión a MongoDB.
 * @constant {string}
 * @default
 */
const MONGODB_URI = `mongodb://${host}:${port}/${db}`;

/**
 * Conexión a la base de datos MongoDB utilizando Mongoose.
 * @function
 * @async
 * @returns {Promise} - Promesa que se resuelve una vez se ha establecido la conexión.
 * @throws {Error} - Error si no se puede conectar a la base de datos.
 */
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, // Opciones de configuración para la conexión
  useUnifiedTopology: true,
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((error) => console.error("Error al conectarse a MongoDB: ", error));

/**
 * Exporta el objeto Mongoose para que se pueda utilizar en otros módulos.
 * @alias module:mongoose
 * @type {Object}
 */
export default mongoose;
