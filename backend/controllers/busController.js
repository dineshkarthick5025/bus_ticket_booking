import Bus from '../models/Bus.js';

// @desc Fetch all buses
// @route GET /api/buses
export const getBuses = async (req, res) => {
    const { from, to } = req.query;
    let query = {};
    if (from) query.from = new RegExp(from, 'i');
    if (to) query.to = new RegExp(to, 'i');

    const buses = await Bus.find(query);
    res.json(buses);
};

// @desc Fetch single bus
// @route GET /api/buses/:id
export const getBusById = async (req, res) => {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
        res.json(bus);
    } else {
        res.status(404).json({ message: 'Bus not found' });
    }
};

// @desc Create a bus (Admin only)
// @route POST /api/buses
export const createBus = async (req, res) => {
    const bus = new Bus({
        name: req.body.name,
        type: req.body.type,
        from: req.body.from,
        to: req.body.to,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        duration: req.body.duration,
        price: req.body.price,
        seatsAvailable: req.body.seatsAvailable,
        amenities: req.body.amenities || [],
    });

    const createdBus = await bus.save();
    res.status(201).json(createdBus);
};

// @desc Update a bus (Admin only)
// @route PUT /api/buses/:id
export const updateBus = async (req, res) => {
    const bus = await Bus.findById(req.params.id);

    if (bus) {
        bus.name = req.body.name || bus.name;
        bus.type = req.body.type || bus.type;
        bus.from = req.body.from || bus.from;
        bus.to = req.body.to || bus.to;
        bus.departureTime = req.body.departureTime || bus.departureTime;
        bus.arrivalTime = req.body.arrivalTime || bus.arrivalTime;
        bus.price = req.body.price || bus.price;
        bus.seatsAvailable = req.body.seatsAvailable || bus.seatsAvailable;

        const updatedBus = await bus.save();
        res.json(updatedBus);
    } else {
        res.status(404).json({ message: 'Bus not found' });
    }
};

// @desc Delete a bus (Admin only)
// @route DELETE /api/buses/:id
export const deleteBus = async (req, res) => {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
        await bus.deleteOne();
        res.json({ message: 'Bus removed' });
    } else {
        res.status(404).json({ message: 'Bus not found' });
    }
};
