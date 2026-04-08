// types.ts

export interface Booking {
    id: string;
    venueId: string;
    userId: string;
    startTime: string;  // ISO8601 format
    endTime: string;    // ISO8601 format
    status: 'confirmed' | 'pending' | 'canceled';
    createdAt: string;  // ISO8601 format
    updatedAt: string;  // ISO8601 format
}

export interface Venue {
    id: string;
    name: string;
    location: string;
    capacity: number;
    facilities: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}