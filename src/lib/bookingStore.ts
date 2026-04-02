import { create } from 'zustand';

export interface BookingState {
  // Hall
  hallDuration: string | null;
  selectedExtras: string[];
  // Photography
  photoPackageId: string | null;
  photoEventCount: 1 | 2;
  // Decoration
  selectedDecorations: string[];
  // Events
  eventSelected: boolean;
  eventGuestCount: number;
  // Payment
  transactionId: string;
  paymentScreenshot: File | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventDate: Date | null;
  // Booking history
  bookingHistory: BookingRecord[];

  // Actions
  setHallDuration: (id: string | null) => void;
  toggleExtra: (id: string) => void;
  setPhotoPackage: (id: string | null) => void;
  setPhotoEventCount: (count: 1 | 2) => void;
  toggleDecoration: (id: string) => void;
  setEventSelected: (v: boolean) => void;
  setEventGuestCount: (n: number) => void;
  setTransactionId: (id: string) => void;
  setPaymentScreenshot: (f: File | null) => void;
  setCustomerName: (n: string) => void;
  setCustomerPhone: (p: string) => void;
  setCustomerEmail: (e: string) => void;
  setEventDate: (d: Date | null) => void;
  addBooking: (record: BookingRecord) => void;
  resetSelections: () => void;
}

export interface BookingRecord {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  totalAmount: number;
  advanceAmount: number;
  status: 'pending' | 'confirmed' | 'completed';
  selections: string[];
}

// Load booking history from localStorage
const loadHistory = (): BookingRecord[] => {
  try {
    const saved = localStorage.getItem('sikara-bookings');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

export const useBookingStore = create<BookingState>((set) => ({
  hallDuration: null,
  selectedExtras: [],
  photoPackageId: null,
  photoEventCount: 1,
  selectedDecorations: [],
  eventSelected: false,
  eventGuestCount: 500,
  transactionId: '',
  paymentScreenshot: null,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  eventDate: null,
  bookingHistory: loadHistory(),

  setHallDuration: (id) => set({ hallDuration: id }),
  toggleExtra: (id) => set((s) => ({
    selectedExtras: s.selectedExtras.includes(id)
      ? s.selectedExtras.filter(e => e !== id)
      : [...s.selectedExtras, id]
  })),
  setPhotoPackage: (id) => set({ photoPackageId: id }),
  setPhotoEventCount: (count) => set({ photoEventCount: count }),
  toggleDecoration: (id) => set((s) => ({
    selectedDecorations: s.selectedDecorations.includes(id)
      ? s.selectedDecorations.filter(d => d !== id)
      : [...s.selectedDecorations, id]
  })),
  setEventSelected: (v) => set({ eventSelected: v }),
  setEventGuestCount: (n) => set({ eventGuestCount: n }),
  setTransactionId: (id) => set({ transactionId: id }),
  setPaymentScreenshot: (f) => set({ paymentScreenshot: f }),
  setCustomerName: (n) => set({ customerName: n }),
  setCustomerPhone: (p) => set({ customerPhone: p }),
  setCustomerEmail: (e) => set({ customerEmail: e }),
  setEventDate: (d) => set({ eventDate: d }),
  addBooking: (record) => set((s) => {
    const updated = [record, ...s.bookingHistory];
    localStorage.setItem('sikara-bookings', JSON.stringify(updated));
    return { bookingHistory: updated };
  }),
  resetSelections: () => set({
    hallDuration: null,
    selectedExtras: [],
    photoPackageId: null,
    photoEventCount: 1,
    selectedDecorations: [],
    eventSelected: false,
    eventGuestCount: 500,
    transactionId: '',
    paymentScreenshot: null,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    eventDate: null,
  }),
}));
