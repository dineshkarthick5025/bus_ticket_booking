import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { registerUser } from '../../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const SignupPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await registerUser(formData);
            login(data.user, data.token);
            toast.success(`Account created! Welcome, ${data.user.name}`);
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join Kavyamani Roadways for easy ticket booking</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">Full Name</label>
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

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="email"
                                className="input-field pl-10"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2 shadow-xl shadow-primary-500/20"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <>
                                <span>Join Now</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <p className="text-center text-sm text-slate-500">
                        Already have an account? <Link to="/login" className="text-primary-500 font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
