import express from 'express';
import { createShipment , getAllShipments , getMyShipments , editShipment } from '../controllers/shipmentController.js';
import { updateTrackingStatus , trackShipment } from '../controllers/trackShipmentController.js';
import { protectedRoute} from '../middleware/authMiddleware.js';
import { adminRoute } from '../middleware/admin.js';

const router = express.Router()

router.post('/shipments', protectedRoute , createShipment )

router.get('/shipments/track/:trackingNumber', trackShipment )
router.get('/shipments/mine', protectedRoute , getMyShipments )
router.get('/shipments', protectedRoute, adminRoute , getAllShipments )

router.put('/shipments/:id', protectedRoute , adminRoute , editShipment )
router.put('/shipments/track/:trackingNumber', protectedRoute, adminRoute , updateTrackingStatus 

)

export default router;
