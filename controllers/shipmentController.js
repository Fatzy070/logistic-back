import Shipment from '../models/shipmentSchema.js'
import { generateTrackingNumber } from '../utils/tracking.js';

export const createShipment = async (req , res ) => {
    try {
        const userId = req.user.userId;
        const { senderName, receiverName,   receiverPhone,      pickupAddress,   deliveryAddress, packageType, weight, price , note,} = req.body;
  
        if (!senderName || !receiverName || !receiverPhone || !pickupAddress || !deliveryAddress ) {
            return res.status(400).json({  message: 'Please provide all required fields' });
        }
        
        const trackingNumber = generateTrackingNumber();

        const shipment = await Shipment.create({ 
            trackingNumber,
            senderName,
            receiverName,
            receiverPhone,
            pickupAddress,
            deliveryAddress,
            packageType,
            weight,
            price,
            note,
            status: 'pending' ,
            createdBy: userId ,
            history: [{
                status: 'pending' ,
                location: pickupAddress ,
                date: new Date()
            }]
        })

        res.status(201).json({
      message: "Shipment created successfully",
      shipment,
    });
    } catch (error) {
        console.error('Error during shipment creation:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMyShipments = async (req , res) => {
    try {
        const userId = req.user.userId;
         const shipments = await Shipment.find({ createdBy: userId }).sort({ createdAt: -1 });
        res.status(200).json({
            shipments
        })

    } catch (error) {
       console.error('Error fetching user shipments:', error);
       res.status(500).json({ message: 'Server error' }); 
    }
}

export const getAllShipments = async (req , res) => {
    try {
        const shipments = await Shipment.find().populate('assignedRider' , 'name email')
        res.status(200).json({
            shipments
        })
    } catch (error) {
        console.error('Error fetching all shipments:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const editShipment = async (req , res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const shipment = await Shipment.findById(id)
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        const allowedFields = [
            'receiverName', 'receiverPhone', 'pickupAddress', 'deliveryAddress',
            'packageType', 'weight', 'price', 'note', 'assignedRider'
        ];

        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                shipment[field] = updates[field];
            }
        });

        await shipment.save();
        res.status(200).json({ 
            message: 'Shipment updated successfully',
            shipment
        })

    } catch (error) {
        console.error('Error editing shipment:', error);
        res.status(500).json({ message: 'Server error' });
    }
}