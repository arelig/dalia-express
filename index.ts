import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database'; 
import usersRoutes from './routes/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// Ruta de prueba
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

// Rutas CRUD
app.use('/users', usersRoutes);

// Manejo de errores
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    const message = error.message;
    res.status(status).json({ message: message });
});

// Sincronización de la base de datos
sequelize
    .sync()
    .then(result => {
        console.log("Conexión a la base de datos establecida");
        app.listen(3000);
    })
    .catch(err => console.log(err));
