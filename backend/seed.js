import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Bus from './models/Bus.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Bus.deleteMany();

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin'
        });

        await User.create({
            name: 'Sample User',
            email: 'user@test.com',
            password: 'password123',
            role: 'user'
        });

        await Bus.insertMany([
            {
                name: 'SRS Travels',
                type: 'AC Sleeper',
                from: 'Bangalore',
                to: 'Chennai',
                departureTime: '21:00',
                arrivalTime: '06:00',
                duration: '9h 00m',
                price: 1200,
                seatsAvailable: 30,
                amenities: ['WiFi', 'Charging Point']
            },
            {
                name: 'KPN Travels',
                type: 'Non-AC Seater',
                from: 'Bangalore',
                to: 'Hyderabad',
                departureTime: '22:00',
                arrivalTime: '07:30',
                duration: '9h 30m',
                price: 900,
                seatsAvailable: 40,
                amenities: ['Charging Point']
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
