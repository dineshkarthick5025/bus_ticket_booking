import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Home } from 'lucide-react';

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">No Booking Found</h2>
                <Link to="/" className="btn-primary">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pt-12 pb-24">
            <div className="max-w-2xl mx-auto px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
                >
                    <div className="bg-green-500 p-12 text-center text-white relative">
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                            <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-white/20 rotate-45 transform"></div>
                        </div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                        >
                            <CheckCircle size={48} className="text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-black mb-2">Booking Confirmed!</h1>
                        <p className="text-green-100 opacity-90">Your ticket has been sent to {booking.passengerDetails.email}</p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-center mb-8 pb-8 border-b border-dashed border-slate-200">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Booking ID</p>
                                <h4 className="text-xl font-mono font-bold text-slate-900">#{booking._id.slice(-6).toUpperCase()}</h4>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Confirmed</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Bus</p>
                                    <p className="font-bold text-slate-900">{booking.busName}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Travel Date</p>
                                    <p className="font-bold text-slate-900">{booking.date}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Route</p>
                                    <p className="font-bold text-slate-900">{booking.from} to {booking.to}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Seats</p>
                                    <p className="font-bold text-primary-500">{booking.seats.join(', ')}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Passenger</p>
                                    <p className="font-bold text-slate-900">{booking.passengerDetails.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <button className="btn-secondary py-3 flex items-center justify-center space-x-2">
                                <Download size={18} />
                                <span>Download Ticket</span>
                            </button>
                            <button className="btn-secondary py-3 flex items-center justify-center space-x-2">
                                <Share2 size={18} />
                                <span>Share Details</span>
                            </button>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="btn-primary w-full mt-6 py-4 flex items-center justify-center space-x-2"
                        >
                            <Home size={18} />
                            <span>Back to Home</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
