import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { fetchBusDetails } from '../services/api';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, Info, Armchair } from 'lucide-react';
import { toast } from 'sonner';

const SeatSelectionPage = () => {
    const { busId } = useParams();
    const navigate = useNavigate();
    const { selectedBus, setSelectedBus, selectedSeats, toggleSeat } = useBookingStore();
    const [loading, setLoading] = useState(!selectedBus || selectedBus._id !== busId);

    useEffect(() => {
        if (!selectedBus || selectedBus._id !== busId) {
            const getDetails = async () => {
                try {
                    const { data } = await fetchBusDetails(busId);
                    setSelectedBus(data);
                } catch (error) {
                    toast.error('Failed to load bus details');
                    navigate('/buses');
                } finally {
                    setLoading(false);
                }
            };
            getDetails();
        }
    }, [busId]);

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            toast.error('Please select at least one seat');
            return;
        }
        navigate('/booking-details');
    };

    const totalPrice = selectedSeats.length * (selectedBus?.price || 0);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-white border-b border-slate-200 py-4 px-4 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate('/buses')} className="flex items-center text-slate-600 hover:text-primary-500 transition-colors">
                        <ChevronLeft className="mr-1" /> Back to buses
                    </button>
                    <div className="text-center">
                        <h1 className="font-bold text-slate-900">{selectedBus?.name}</h1>
                        <p className="text-xs text-slate-500">{selectedBus?.type} • AC</p>
                    </div>
                    <div className="w-20"></div> {/* Spacer */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Seat Layout */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 overflow-x-auto">
                        <div className="min-w-[300px]">
                            <div className="flex justify-between items-center mb-12">
                                <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                                    <div className="w-6 h-6 border-2 border-slate-400 rounded-sm mr-2 flex items-center justify-center">
                                        <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
                                    </div>
                                    Driver's Cabin
                                </div>
                                <div className="flex space-x-6 text-xs text-slate-500">
                                    <div className="flex items-center"><div className="w-4 h-4 bg-white border border-slate-200 rounded-sm mr-2"></div> Available</div>
                                    <div className="flex items-center"><div className="w-4 h-4 bg-slate-400 rounded-sm mr-2"></div> Booked</div>
                                    <div className="flex items-center"><div className="w-4 h-4 bg-primary-500 rounded-sm mr-2"></div> Selected</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-6 max-w-sm mx-auto">
                                {/* Mock seat layout generator */}
                                {Array(8).fill(0).map((_, row) => (
                                    <React.Fragment key={row}>
                                        <Seat id={`A${row + 1}`} type="sleeper" />
                                        <Seat id={`B${row + 1}`} type="sleeper" />
                                        <div className="w-8"></div> {/* Aisle */}
                                        <Seat id={`C${row + 1}`} type="sleeper" />
                                        <Seat id={`D${row + 1}`} type="sleeper" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-32">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Selected Seats ({selectedSeats.length})</span>
                                <span className="font-bold text-slate-900">{selectedSeats.join(', ') || 'None'}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Base Fare</span>
                                <span className="font-bold text-slate-900">₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Service Fee</span>
                                <span className="font-bold text-slate-900">₹0</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="font-bold text-slate-900">Total Price</span>
                                <span className="text-2xl font-black text-primary-500">₹{totalPrice}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleContinue}
                            className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span>Confirm & Continue</span>
                        </button>

                        <div className="mt-4 flex items-center justify-center text-xs text-slate-400">
                            <Info size={14} className="mr-1" /> Fully refundable until 24hrs before departure
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Seat Component (defined inside for convenience or extract later)
const Seat = ({ id, type = 'seater', isBookedPlaceholder = false }) => {
    const { selectedBus, selectedSeats, toggleSeat } = useBookingStore();
    const isSelected = selectedSeats.includes(id);
    // Simulating some booked seats for trial
    const isBooked = selectedBus?.bookedSeats?.includes(id);

    return (
        <motion.button
            whileHover={!isBooked ? { scale: 1.1 } : {}}
            whileTap={!isBooked ? { scale: 0.95 } : {}}
            onClick={() => !isBooked && toggleSeat(id)}
            disabled={isBooked}
            className={`
        relative w-full aspect-[1/1.5] rounded-lg border-2 transition-all flex flex-col items-center justify-center
        ${isBooked ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' :
                    isSelected ? 'bg-primary-500 border-primary-600 text-white shadow-lg shadow-primary-500/30' :
                        'bg-white border-slate-200 text-slate-400 hover:border-primary-400 hover:text-primary-500'}
      `}
        >
            <Armchair size={20} className="mb-1" />
            <span className="text-[10px] font-bold uppercase">{id}</span>
            {isSelected && (
                <motion.div
                    layoutId="selection-glow"
                    className="absolute inset-[-4px] border-2 border-primary-500 rounded-xl opacity-50"
                />
            )}
        </motion.button>
    );
};

// Add React to the scope if needed by the component layout generator above
import React from 'react';

export default SeatSelectionPage;
