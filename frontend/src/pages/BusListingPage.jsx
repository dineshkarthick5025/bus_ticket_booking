import { useState, useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { fetchBuses } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, Clock, MapPin, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusListingPage = () => {
    const navigate = useNavigate();
    const { searchQuery, setSelectedBus } = useBookingStore();
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBuses = async () => {
            setLoading(true);
            try {
                const { data } = await fetchBuses(searchQuery);
                setBuses(data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            } finally {
                setLoading(false);
            }
        };
        getBuses();
    }, [searchQuery]);

    const handleSelectBus = (bus) => {
        setSelectedBus(bus);
        navigate(`/seats/${bus._id}`);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header Info */}
            <div className="bg-white border-b border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block">
                            <div className="text-sm text-slate-500">From</div>
                            <div className="font-bold text-slate-900">{searchQuery.from || 'Bangalore'}</div>
                        </div>
                        <ChevronRight className="text-slate-300" size={20} />
                        <div>
                            <div className="text-sm text-slate-500">To</div>
                            <div className="font-bold text-slate-900">{searchQuery.to || 'Chennai'}</div>
                        </div>
                        <div className="h-10 w-px bg-slate-200 mx-4 hidden md:block"></div>
                        <div className="hidden md:block">
                            <div className="text-sm text-slate-500">Travel Date</div>
                            <div className="font-bold text-slate-900">
                                {searchQuery.date ? new Date(searchQuery.date).toLocaleDateString() : 'Today'}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="btn-secondary py-2 text-sm">Modify Search</button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900 flex items-center">
                                <Filter className="w-4 h-4 mr-2" /> Filters
                            </h3>
                            <button className="text-sm text-primary-500 font-semibold">Clear All</button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-3">Bus Type</label>
                                <div className="space-y-2">
                                    {['AC', 'Non-AC', 'Sleeper', 'Seater'].map((type) => (
                                        <label key={type} className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded text-primary-500 focus:ring-primary-500" />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <label className="block text-sm font-semibold text-slate-700 mb-3">Departure Time</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                                        <button key={time} className="px-3 py-2 text-xs border border-slate-200 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors">
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bus List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-slate-900">{buses.length} Buses found</h2>
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="text-slate-500">Sort by:</span>
                            <select className="bg-transparent font-semibold text-slate-900 outline-none cursor-pointer">
                                <option>Cheapest First</option>
                                <option>Fastest First</option>
                                <option>Earliest Departure</option>
                            </select>
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-48 bg-white rounded-2xl animate-pulse shadow-sm border border-slate-100"></div>
                            ))
                        ) : buses.length > 0 ? (
                            buses.map((bus) => (
                                <motion.div
                                    key={bus._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -2 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 group transition-all"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{bus.name}</h3>
                                                    <div className="text-sm text-slate-500 flex items-center space-x-2">
                                                        <span>{bus.type}</span>
                                                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded flex items-center">
                                                            <Star className="w-3 h-3 mr-1 fill-current" /> {bus.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-slate-900">₹{bus.price}</p>
                                                    <p className="text-xs text-slate-400">per seat</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 items-center bg-slate-50 rounded-xl p-4">
                                                <div>
                                                    <div className="text-lg font-bold text-slate-900">{bus.departureTime}</div>
                                                    <div className="text-xs text-slate-500">{bus.from}</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="text-xs text-slate-400 mb-1">{bus.duration}</div>
                                                    <div className="relative w-full flex items-center">
                                                        <div className="h-px bg-slate-300 flex-grow"></div>
                                                        <Bus className="w-4 h-4 text-primary-500 mx-2" />
                                                        <div className="h-px bg-slate-300 flex-grow"></div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-slate-900">{bus.arrivalTime}</div>
                                                    <div className="text-xs text-slate-500">{bus.to}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col justify-between items-end gap-4 min-w-[200px]">
                                            <div className="text-sm text-slate-500 flex items-center">
                                                <Info className="w-4 h-4 mr-1" />
                                                {bus.seatsAvailable} seats left
                                            </div>
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                {bus.amenities?.slice(0, 2).map((a) => (
                                                    <span key={a} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{a}</span>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => handleSelectBus(bus)}
                                                className="btn-primary w-full md:w-auto"
                                            >
                                                Select Seats
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                <div className="text-4xl mb-4">🚌</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No Buses Found</h3>
                                <p className="text-slate-500">Try adjusting your filters or location</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Simple Bus icon component as lucide-react Bus might be different or for fallback
const Bus = ({ className }) => (
    <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" />
        <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
);

export default BusListingPage;
