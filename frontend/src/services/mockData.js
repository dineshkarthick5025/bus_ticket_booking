export const buses = [
    {
        id: '1',
        name: 'SRS Travels',
        type: 'AC Sleeper (2+1)',
        departureTime: '21:00',
        arrivalTime: '06:00',
        duration: '9h 00m',
        price: 1200,
        rating: 4.5,
        seatsAvailable: 15,
        from: 'Bangalore',
        to: 'Chennai',
        amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
        layout: [
            { id: '1A', status: 'available', price: 1200, type: 'sleeper' },
            { id: '1B', status: 'booked', price: 1200, type: 'sleeper' },
            { id: '1C', status: 'available', price: 1200, type: 'sleeper' },
            { id: '2A', status: 'available', price: 1200, type: 'sleeper' },
            { id: '2B', status: 'available', price: 1200, type: 'sleeper' },
            { id: '2C', status: 'booked', price: 1200, type: 'sleeper' },
        ]
    },
    {
        id: '2',
        name: 'KPN Travels',
        type: 'Non-AC Semi Sleeper (2+2)',
        departureTime: '22:30',
        arrivalTime: '07:30',
        duration: '9h 00m',
        price: 850,
        rating: 4.2,
        seatsAvailable: 24,
        from: 'Bangalore',
        to: 'Chennai',
        amenities: ['Charging Point', 'Water Bottle'],
        layout: [
            { id: 'L1', status: 'available', price: 850, type: 'seater' },
            { id: 'L2', status: 'available', price: 850, type: 'seater' },
            { id: 'R1', status: 'booked', price: 850, type: 'seater' },
            { id: 'R2', status: 'available', price: 850, type: 'seater' },
        ]
    },
    {
        id: '3',
        name: 'Orange Travels',
        type: 'Scania Multi-Axle AC Semi Sleeper',
        departureTime: '20:15',
        arrivalTime: '05:45',
        duration: '9h 30m',
        price: 1500,
        rating: 4.8,
        seatsAvailable: 12,
        from: 'Bangalore',
        to: 'Hyderabad',
        amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Movies'],
    }
];

export const bookings = [
    {
        id: 'BK1001',
        busId: '1',
        busName: 'SRS Travels',
        from: 'Bangalore',
        to: 'Chennai',
        date: '2024-05-20',
        seats: ['1A', '2A'],
        totalAmount: 2400,
        status: 'Confirmed',
        user: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '9876543210'
        }
    }
];

export const users = [
    { id: '1', name: 'User One', email: 'user@test.com', password: 'password123', role: 'user' },
    { id: '2', name: 'Admin One', email: 'admin@test.com', password: 'password123', role: 'admin' },
];
