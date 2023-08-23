import { Router } from 'express';
import * as UserController from '../controllers/users';

const router = Router();

// CRUD Routes /users
router.get('/', UserController.getUsers); // /users
router.post('/', UserController.createUser); // /users
//router.get('/:userId', UserController.getUser); // /users/:userId
//router.put('/:userId', UserController.updateUser); // /users/:userId
//router.delete('/:userId', UserController.deleteUser); // /users/:userId

export default router;
