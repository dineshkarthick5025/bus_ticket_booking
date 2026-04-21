import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { Search, MapPin, Calendar, Users, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery } = useBookingStore();
    const [from, setFrom] = useState(searchQuery.from);
    const [to, setTo] = useState(searchQuery.to);
    const [date, setDate] = useState(searchQuery.date);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery({ from, to, date });
        navigate('/buses');
    };

    const swapLocations = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-600 to-indigo-700">
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-12 md:pt-20 md:pb-16 flex flex-col items-center text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4"
                    >
                        Your Journey Starts Here
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base sm:text-xl text-primary-50 max-w-2xl mb-8"
                    >
                        Find and book bus tickets to hundreds of destinations at the best prices.
                    </motion.p>

                    {/* Search Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-5xl glass-card rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl"
                    >
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-end gap-3">
                            {/* From + Swap + To — always a row */}
                            <div className="flex items-end gap-2 flex-1 min-w-0">
                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">From</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Source City"
                                            className="input-field pl-9"
                                            value={from}
                                            onChange={(e) => setFrom(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={swapLocations}
                                    className="w-9 h-9 mb-[1px] bg-white border border-slate-200 rounded-full flex items-center justify-center shadow hover:bg-primary-50 hover:border-primary-300 transition-colors flex-shrink-0"
                                    title="Swap locations"
                                >
                                    <ArrowRightLeft className="w-4 h-4 text-primary-500" />
                                </button>

                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">To</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Destination City"
                                            className="input-field pl-9"
                                            value={to}
                                            onChange={(e) => setTo(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Date — fixed width on desktop, full width on mobile */}
                            <div className="w-full md:w-44">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10 pointer-events-none" />
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        className="input-field pl-9 w-full"
                                        placeholderText="Select Date"
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary h-[42px] flex items-center justify-center gap-2 px-6 whitespace-nowrap flex-shrink-0">
                                <Search className="w-4 h-4" />
                                <span>Search Buses</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Why Choose Kavyamani Roadways?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Best Prices",
                            desc: "Get the most competitive rates and exclusive offers on every booking.",
                            icon: "💰"
                        },
                        {
                            title: "Verified Operators",
                            desc: "We only partner with top-rated and reliable bus operators.",
                            icon: "✅"
                        },
                        {
                            title: "24/7 Support",
                            desc: "Our dedicated support team is always available to assist you.",
                            icon: "📞"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
