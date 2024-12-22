import express from 'express'
import { login, logout, register } from '../contollers/admin.controller.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register)
router.route("/logout").post(logout)

export default router;