import { Request, Response } from 'express';
import User from '../models/user';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({
            message: 'Usuarios obtenidos exitosamente',
            data: users,
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};

// Crear un usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({
            name: name,
            email: email,
            password: req.body.password
        });
        
        console.log('Usuario creado');
        return res.status(201).json({
            message: '¡Usuario creado exitosamente!',
            data: user
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};





