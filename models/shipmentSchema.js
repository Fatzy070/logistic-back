import mongoose from "mongoose";
const Schema = mongoose.Schema;

const historySchema = new Schema({
    location: String ,
    status: String ,
    date: Date
})


const shipmentSchema = new Schema({
      trackingNumber: { type: String, unique: true },
      senderName: String ,
      recieverName: String ,
      recieverPhone: String ,
      pickupAddress: String ,
      deliveryAddress: String ,
      packageType: String ,
      weight: String ,
      price: Number ,
      status: { type: String, enum: ["pending",
      "picked",
      "in-transit",
      "out-for-delivery",
      "delivered",
      "cancelled",] 
      , default: 'pending' },
      currentLocation: String ,
      history: [historySchema] ,
      assignedRider: { type: Schema.Types.ObjectId, ref: 'User' },
      createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
    
},{ timestamps: true })


export default mongoose.model('Shipment', shipmentSchema);