import { useState, useEffect } from 'react';
import { getAllBookings, getAllBuses } from '../../services/api';
import { motion } from 'framer-motion';
import {
    Users, Bus, Calendar, TrendingUp,
    MapPin, Clock, MoreVertical, Search
} from 'lucide-react';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalBuses: 0,
        activeRoutes: 0,
        revenue: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [bookingsRes, busesRes] = await Promise.all([getAllBookings(), getAllBuses()]);
                setRecentBookings(bookingsRes.data);
                setStats({
                    totalBookings: bookingsRes.data.length,
                    totalBuses: busesRes.data.length,
                    activeRoutes: new Set(busesRes.data.map(b => `${b.from}-${b.to}`)).size,
                    revenue: bookingsRes.data.reduce((acc, curr) => acc + curr.totalAmount, 0)
                });
            } catch (error) {
                console.error('Dashboard data load failed', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const statCards = [
        { title: 'Total Bookings', value: stats.totalBookings, icon: Users, color: 'blue' },
        { title: 'Total Buses', value: stats.totalBuses, icon: Bus, color: 'primary' },
        { title: 'Active Routes', value: stats.activeRoutes, icon: MapPin, color: 'indigo' },
        { title: 'Total Revenue', value: `₹${stats.revenue}`, icon: TrendingUp, color: 'green' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-1">Overview of your bus booking platform</p>
                </div>
                <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">Download Report</button>
                    <button className="btn-primary text-sm bg-slate-900 hover:bg-slate-800 border-none">Manage Platform</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4"
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center`}>
                            <stat.icon className={`text-${stat.color}-500 w-7 h-7`} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                            <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Recent Bookings</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search bookings..."
                                    className="bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                        <th className="px-6 py-4">Booking ID</th>
                                        <th className="px-6 py-4">Passenger</th>
                                        <th className="px-6 py-4">Bus / Route</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {loading ? (
                                        Array(4).fill(0).map((_, i) => (
                                            <tr key={i} className="animate-pulse">
                                                <td colSpan="6" className="px-6 py-4"><div className="h-4 bg-slate-100 rounded"></div></td>
                                            </tr>
                                        ))
                                    ) : recentBookings.map((b) => (
                                        <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-sm font-bold text-slate-900">#{b._id.slice(-6)}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{b.user.name}</div>
                                                <div className="text-xs text-slate-500">{b.user.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{b.busName}</div>
                                                <div className="text-xs text-slate-500">{b.from} → {b.to}</div>
                                            </td>
                                            <td className="px-6 py-4 font-black">₹{b.totalAmount}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase">
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-slate-400 hover:text-slate-900"><MoreVertical size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-50 text-center">
                            <button className="text-sm font-bold text-primary-500 hover:underline">View All Bookings</button>
                        </div>
                    </div>
                </div>

                {/* System Activity / Summary */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-6">Upcoming Trips</h3>
                        <div className="space-y-4">
                            {loading ? <div className="h-20 bg-slate-50 animate-pulse rounded-2xl"></div> : (
                                [1, 2].map((i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center border border-slate-100">
                                            <span className="text-[10px] font-bold text-slate-400">MAY</span>
                                            <span className="text-lg font-black text-slate-900 font-mono">2{i}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Bangalore to Chennai</div>
                                            <div className="text-xs text-slate-500 flex items-center mt-1">
                                                <Clock size={12} className="mr-1" /> 21:00 PM • SRS Travels
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white shadow-xl shadow-primary-500/20">
                        <h4 className="text-lg font-bold mb-2">Need help?</h4>
                        <p className="text-primary-100 text-sm mb-6 opacity-80">Access our premium support for enterprise accounts.</p>
                        <button className="w-full py-3 bg-white text-primary-600 rounded-xl font-bold hover:bg-primary-50 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
