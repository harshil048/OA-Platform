import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { register, login, refresh, logout } from '../controllers/user.controler.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh').post(refresh);
router.route('/logout').get(verifyJWT, logout);
export default router;
