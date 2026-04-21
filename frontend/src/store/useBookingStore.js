import { create } from 'zustand';

export const useBookingStore = create((set) => ({
    searchQuery: {
        from: '',
        to: '',
        date: new Date(),
        passengers: 1
    },
    selectedBus: null,
    selectedSeats: [],
    bookingDetails: null,

    setSearchQuery: (query) => set((state) => ({
        searchQuery: { ...state.searchQuery, ...query }
    })),

    setSelectedBus: (bus) => set({ selectedBus: bus, selectedSeats: [] }),

    toggleSeat: (seatId) => set((state) => ({
        selectedSeats: state.selectedSeats.includes(seatId)
            ? state.selectedSeats.filter(id => id !== seatId)
            : [...state.selectedSeats, seatId]
    })),

    setBookingDetails: (details) => set({ bookingDetails: details }),

    resetBooking: () => set({
        selectedBus: null,
        selectedSeats: [],
        bookingDetails: null
    })
}));
