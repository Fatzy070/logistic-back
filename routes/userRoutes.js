import express from 'express';
import { Login , SignUp , getProfile , deleteUser , getAllUsers } from '../controllers/userController.js';
import {  protectedRoute} from '../middleware/authMiddleware.js';
import { adminRoute } from '../middleware/admin.js';
const router = express.Router()

router.post('/signup' , SignUp )
router.post('/login' , Login )

router.get('/profile',protectedRoute , getProfile )
router.get('/users', protectedRoute , adminRoute , getAllUsers )


router.delete('/user/:id', protectedRoute, adminRoute , deleteUser)

export default router;