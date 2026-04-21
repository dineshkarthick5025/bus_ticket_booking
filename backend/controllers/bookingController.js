import Booking from '../models/Booking.js';
import Bus from '../models/Bus.js';

// @desc Create new booking
// @route POST /api/bookings
export const addBooking = async (req, res) => {
    const { busId, seats, passengerDetails, totalAmount, date } = req.body;

    if (seats && seats.length === 0) {
        res.status(400).json({ message: 'No seats selected' });
        return;
    }

    const bus = await Bus.findById(busId);
    if (!bus) {
        res.status(404).json({ message: 'Bus not found' });
        return;
    }

    // Update bus booked seats
    bus.bookedSeats = [...(bus.bookedSeats || []), ...seats];
    bus.seatsAvailable = bus.seatsAvailable - seats.length;
    await bus.save();

    const booking = new Booking({
        user: req.user._id,
        bus: busId,
        busName: bus.name,
        from: bus.from,
        to: bus.to,
        date,
        seats,
        totalAmount,
        passengerDetails
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
};

// @desc Get logged in user bookings
// @route GET /api/bookings/my
export const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
};

// @desc Get all bookings (Admin only)
// @route GET /api/bookings
export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find({}).populate('user', 'id name email');
    res.json(bookings);
};
