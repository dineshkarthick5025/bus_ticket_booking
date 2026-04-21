import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Bus, User, LogOut, Menu, X, ShieldCheck, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { title: 'Search Buses', path: '/' },
        { title: 'My Bookings', path: '/my-bookings', roles: ['user', 'admin'] },
    ];

    const adminLinks = [
        { title: 'Dashboard', path: '/admin/dashboard' },
        { title: 'Manage Buses', path: '/admin/buses' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <Bus className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                Kavyamani Roadways
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.filter(link => !link.roles || (isAuthenticated && link.roles.includes(user?.role))).map((link) => (
                            <Link key={link.path} to={link.path} className="text-slate-600 hover:text-primary-500 font-medium transition-colors">
                                {link.title}
                            </Link>
                        ))}

                        {isAuthenticated && user?.role === 'admin' && adminLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="text-slate-600 hover:text-primary-500 font-medium transition-colors flex items-center">
                                <ShieldCheck className="w-4 h-4 mr-1 text-primary-500" />
                                {link.title}
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-slate-200"></div>

                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                        >
                            <div className="block dark:hidden"><Moon size={20} /></div>
                            <div className="hidden dark:block"><Sun size={20} /></div>
                        </button>

                        <div className="h-6 w-px bg-slate-200 text-slate-200"></div>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 group cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                        <User className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-slate-500 hover:text-red-500 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-600 hover:text-primary-500 font-medium">Login</Link>
                                <Link to="/signup" className="btn-primary py-2 px-6">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-primary-500"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                                >
                                    {link.title}
                                </Link>
                            ))}
                            {isAuthenticated && user?.role === 'admin' && adminLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-slate-50 rounded-md"
                                >
                                    {link.title}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-100">
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center"
                                    >
                                        <LogOut className="w-5 h-5 mr-2" /> Logout
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-slate-50 rounded-md"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
