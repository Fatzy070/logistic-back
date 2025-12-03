import express from 'express';
import { Login , SignUp , getProfile , deleteUser  } from '../controllers/userController.js';
import {  protectedRoute} from '../middleware/authMiddleware.js';
import { adminRoute } from '../middleware/admin.js';
const router = express.Router()

router.post('/signup' , SignUp )
router.post('/login' , Login )

router.get('/profile',protectedRoute , getProfile )
router.delete('/user/:id', protectedRoute, adminRoute , deleteUser)

export default router;