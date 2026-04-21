import { useState, useEffect } from 'react';
import { getAllBuses, addBus, updateBus, deleteBus } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Bus, MapPin, Clock, Search, X } from 'lucide-react';
import { toast } from 'sonner';

const BusManagementPage = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBus, setEditingBus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        seatsAvailable: 40
    });

    useEffect(() => {
        loadBuses();
    }, []);

    const loadBuses = async () => {
        setLoading(true);
        try {
            const { data } = await getAllBuses();
            setBuses(data);
        } catch (error) {
            toast.error('Failed to load buses');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (bus = null) => {
        if (bus) {
            setEditingBus(bus);
            setFormData({ ...bus });
        } else {
            setEditingBus(null);
            setFormData({
                name: '',
                type: 'AC Sleeper',
                from: '',
                to: '',
                departureTime: '',
                arrivalTime: '',
                price: '',
                seatsAvailable: 40
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBus) {
                await updateBus(editingBus._id, formData);
                toast.success('Bus updated successfully');
            } else {
                await addBus(formData);
                toast.success('Bus added successfully');
            }
            setIsModalOpen(false);
            loadBuses();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            try {
                await deleteBus(id);
                toast.success('Bus deleted');
                loadBuses();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Manage Buses</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or remove buses from the fleet</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus size={20} />
                    <span>Add New Bus</span>
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                <th className="px-6 py-4">Bus Details</th>
                                <th className="px-6 py-4">Route</th>
                                <th className="px-6 py-4">Timing</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                                    </tr>
                                ))
                            ) : buses.map((bus) => (
                                <tr key={bus._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                                                <Bus size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{bus.name}</div>
                                                <div className="text-xs text-slate-500">{bus.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center text-slate-900 font-medium">
                                            {bus.from} <span className="mx-2 text-slate-300">→</span> {bus.to}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="text-slate-900 font-medium">{bus.departureTime}</div>
                                        <div className="text-xs text-slate-500">Duration: {bus.duration || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 font-black">₹{bus.price}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase">Active</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(bus)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bus._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-2xl font-black text-slate-900">
                                    {editingBus ? 'Edit Bus' : 'Add New Bus'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Bus Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="e.g. SRS Travels"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Bus Type</label>
                                        <select
                                            className="input-field"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            required
                                        >
                                            <option>AC Sleeper</option>
                                            <option>Non-AC Sleeper</option>
                                            <option>AC Seater</option>
                                            <option>Non-AC Seater</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Price (₹)</label>
                                        <input
                                            type="number"
                                            className="input-field"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">From</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={formData.from}
                                            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">To</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={formData.to}
                                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Departure</label>
                                        <input
                                            type="time"
                                            className="input-field"
                                            value={formData.departureTime}
                                            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Arrival</label>
                                        <input
                                            type="time"
                                            className="input-field"
                                            value={formData.arrivalTime}
                                            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
                                    <button type="submit" className="btn-primary flex-1">
                                        {editingBus ? 'Save Changes' : 'Add Bus'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BusManagementPage;
