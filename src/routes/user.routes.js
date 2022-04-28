import { Router } from 'express';
import UserContrls from '../contrls/user.contrls.js';
const router = Router();

router.route('/').get(UserContrls.getAllUsers).post(UserContrls.createUser);

router
	.route('/:userId')
	.get(UserContrls.getUserById)
	.patch(UserContrls.updateUser)
	.delete(UserContrls.deleteUser);

export default router;
