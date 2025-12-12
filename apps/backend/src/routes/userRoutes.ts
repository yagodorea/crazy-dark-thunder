import express from 'express';
import { getUsers, createUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

export default router;
