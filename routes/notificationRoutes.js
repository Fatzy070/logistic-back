import express from 'express'
import { markAsRead , getNotifications } from '../controllers/notificationController.js'
import { protectedRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/notification' , protectedRoute , getNotifications )
router.get('/read' , protectedRoute , markAsRead) 

export default router