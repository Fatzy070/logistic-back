import Notification from "../models/notificationSchema.js";
// import Shipment from "../models/shipmentSchema.js";


export const sendNotification = async ({ io, userId, shipmentId, message, type }) => {
  console.log("sendNotification called for userId:", userId);
  
  const notification = await Notification.create({
    user: userId,
    shipment: shipmentId,
    message,
    type
  });

  io.to(userId.toString()).emit('newNotification', notification);

  return notification;
};


export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.status(200).json({ notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
