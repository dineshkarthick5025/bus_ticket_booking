import { useState, useEffect } from 'react';
import { getBookings } from '../services/api';
import { motion } from 'framer-motion';
import { Bus, Calendar, MapPin, Ticket, Clock } from 'lucide-react';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const { data } = await getBookings();
                setBookings(data);
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyBookings();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-slate-500">Loading your journeys...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900">My Bookings</h1>
                    <p className="text-slate-500 mt-1">Manage your upcoming and past trips</p>
                </div>

                <div className="space-y-6">
                    {bookings.length > 0 ? (
                        bookings.map((booking, i) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row"
                            >
                                <div className="p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-primary-500 tracking-widest mb-1">
                                                Confirmed Journey
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">{booking.busName}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-mono font-bold text-slate-400">#{booking._id.slice(-6).toUpperCase()}</div>
                                            <div className="text-xs text-green-600 font-bold uppercase mt-1">Active</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase">Route</div>
                                                <div className="text-sm font-bold text-slate-700">{booking.from} → {booking.to}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase">Date</div>
                                                <div className="text-sm font-bold text-slate-700">{booking.date}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Ticket size={20} />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase">Seats</div>
                                                <div className="text-sm font-bold text-primary-500">{booking.seats.join(', ')}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase">Total Amount</div>
                                                <div className="text-sm font-bold text-slate-900">₹{booking.totalAmount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 flex md:flex-col justify-center items-center gap-4 min-w-[160px] border-t md:border-t-0 md:border-l border-slate-100">
                                    <button className="btn-secondary w-full py-2 text-xs">View Ticket</button>
                                    <button className="text-xs font-bold text-red-500 hover:underline">Cancel Trip</button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <div className="text-5xl mb-4">🧳</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Bookings Yet</h3>
                            <p className="text-slate-500 mb-8">Ready to explore? Book your first journey now.</p>
                            <button className="btn-primary px-8">Find Buses</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookingsPage;
