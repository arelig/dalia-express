import { Sequelize } from 'sequelize';

// Verificacion de definicion de variables de entorno 
if (!process.env.PG_DB || !process.env.PG_USER || !process.env.PG_PASSWORD || !process.env.PG_HOST) {
    throw new Error("Faltan variables de entorno necesarias para la conexión a la base de datos");
}

// Creación instancia de Sequelize
const sequelize = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
        host: process.env.PG_HOST as string,
        dialect: 'postgres',
    }
);

// Manejo de errores en la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error en la conexión a la base de datos:', error);
    });

export default sequelize;
