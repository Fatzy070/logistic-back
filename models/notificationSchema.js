import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User', required:true  },
    message:{ type:String , required:true },
    shipment:{ type: Schema.Types.ObjectId , ref: 'shipment' } ,
    type: { type: String, enum: ['created', 'delivered'], required: true },
    read: { type: Boolean, default: false }
},{ timestamps:true })

export default mongoose.model('Notification', notificationSchema);
