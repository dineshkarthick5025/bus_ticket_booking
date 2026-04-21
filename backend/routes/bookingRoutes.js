import express from 'express';
import { addBooking, getMyBookings, getAllBookings } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addBooking)
    .get(protect, admin, getAllBookings);

router.get('/my', protect, getMyBookings);

export default router;
