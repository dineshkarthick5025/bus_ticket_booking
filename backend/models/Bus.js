import mongoose from 'mongoose';

const busSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true },
    amenities: [{ type: String }],
    rating: { type: Number, default: 0 },
    bookedSeats: [{ type: String }] // List of seat IDs already booked
}, {
    timestamps: true
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
