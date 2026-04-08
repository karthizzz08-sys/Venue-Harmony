// cateringLogic.ts

// This file contains the logic for determining catering timings.

class CateringLogic {
    // Method to calculate the catering time based on event start time and duration
    static calculateCateringTiming(eventStartTime: string, durationInMinutes: number): string {
        const startTime = new Date(eventStartTime);
        startTime.setMinutes(startTime.getMinutes() + durationInMinutes);
        return startTime.toISOString().split('T')[0] + ' ' + startTime.toISOString().split('T')[1].substring(0, 8);
    }
}

export default CateringLogic;
