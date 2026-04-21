import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold text-white mb-4">Kavyamani Roadways</h3>
                            <p className="text-slate-400 max-w-sm">
                                Book your bus tickets instantly with Kavyamani Roadways. We provide a seamless and secure platform for all your travel needs.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="/" className="hover:text-primary-400 transition-colors">Home</a></li>
                                <li><a href="/my-bookings" className="hover:text-primary-400 transition-colors">My Bookings</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Offers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
                        <p>&copy; {new Date().getFullYear()} Kavyamani Roadways. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <Toaster position="top-center" richColors />
        </div>
    );
};

export default Layout;
