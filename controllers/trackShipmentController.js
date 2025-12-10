import Shipment from '../models/shipmentSchema.js';
import { sendNotification } from './notificationController.js';

export const trackShipment = async (req, res) => {
    try {
        const { trackingNumber } = req.params;

        const shipment = await Shipment.findOne({ trackingNumber }).select("-__v -createdBy -assignedRider");

        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        res.status(200).json({
            success: true,
            shipment
        })

    } catch (error) {
        console.error('Error tracking shipment:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateTrackingStatus = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { status, location } = req.body;

    if (!status || !location) {
      return res.status(400).json({ message: "Status and location are required" });
    }

    const shipment = await Shipment.findOne({ trackingNumber });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    shipment.status = status;
    shipment.currentLocation = location;

    shipment.history.push({
      status,
      location,
      date: new Date()
    });

    await shipment.save();

    
    if (status.toLowerCase() === "delivered") {
      await sendNotification({
        io: req.io,
        userId: shipment.createdBy,  
        shipmentId: shipment._id,
        message: `Shipment #${shipment.trackingNumber} for ${shipment.receiverName} has been delivered successfully.`,
        type: 'delivered'
      });
    }

    res.status(200).json({ 
      message: 'Shipment tracking updated successfully',
      shipment
    });

  } catch (error) {
    console.error('Error updating tracking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
