import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    busName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: String, required: true }, // Formatted date
    seats: [{ type: String, required: true }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
    passengerDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
