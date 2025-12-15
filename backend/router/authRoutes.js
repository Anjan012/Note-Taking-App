import express from 'express';
import {home, login, register} from "../controllers/authController.js"

const router = express.Router();

router.route('/home').get(home);
router.route('/register').post(register);
router.route("/login").post(login);


export default router;