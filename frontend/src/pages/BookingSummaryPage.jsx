import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { useAuthStore } from '../store/useAuthStore';
import { createBooking } from '../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, ChevronLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const BookingSummaryPage = () => {
    const navigate = useNavigate();
    const { selectedBus, selectedSeats, resetBooking } = useBookingStore();
    const { user } = useAuthStore();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);

    if (!selectedBus || selectedSeats.length === 0) {
        navigate('/buses');
        return null;
    }

    const totalPrice = selectedSeats.length * selectedBus.price;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const bookingData = {
                busId: selectedBus._id,
                busName: selectedBus.name,
                from: selectedBus.from,
                to: selectedBus.to,
                date: new Date().toISOString().split('T')[0], // Mock date
                seats: selectedSeats,
                totalAmount: totalPrice,
                passengerDetails: formData
            };

            const { data } = await createBooking(bookingData);
            toast.success('Ticket booked successfully!');
            resetBooking();
            navigate('/confirmation', { state: { booking: data } });
        } catch (error) {
            toast.error('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <button onClick={() => navigate(-1)} className="flex items-center text-slate-600 hover:text-primary-500 mb-8 transition-colors">
                    <ChevronLeft className="mr-1" /> Back to Seat Selection
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* User Details Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                <User className="mr-2 text-primary-500" /> Passenger Details
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                className="input-field pl-10"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                className="input-field pl-10"
                                                placeholder="9876543210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            className="input-field pl-10"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                        <CreditCard className="mr-2 text-primary-500" /> Payment Method
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="border-2 border-primary-500 bg-primary-50 p-4 rounded-xl flex items-center justify-between cursor-pointer">
                                            <span className="font-bold text-primary-700">UPI / Card</span>
                                            <ShieldCheck className="text-primary-500" />
                                        </div>
                                        <div className="border border-slate-200 p-4 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
                                            <span className="font-bold text-slate-400">Net Banking</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        disabled={loading}
                                        className="btn-primary w-full py-4 text-lg relative overflow-hidden"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            `Pay ₹${totalPrice}`
                                        )}
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        By clicking pay, you agree to our Terms and Conditions
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-32">
                            <h4 className="font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Fare Breakup</h4>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Base Fare × {selectedSeats.length}</span>
                                    <span className="font-bold">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Operator Service Fee</span>
                                    <span className="text-green-600 font-bold">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tax (GST)</span>
                                    <span className="font-bold">₹0</span>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-lg">
                                    <span className="font-black">Total</span>
                                    <span className="font-black text-primary-500">₹{totalPrice}</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-primary-50 p-4 rounded-2xl border border-primary-100">
                                <div className="text-[10px] uppercase font-bold text-primary-600 tracking-wider mb-2">Bus Details</div>
                                <div className="text-sm font-bold text-slate-900">{selectedBus.name}</div>
                                <div className="text-xs text-slate-500">{selectedBus.from} → {selectedBus.to}</div>
                                <div className="text-xs text-primary-600 font-semibold mt-2">Seats: {selectedSeats.join(', ')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSummaryPage;
