function getCateringOptions(startTime: string, endTime: string): string[] {
    const options: string[] = [];
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Define time ranges
    const tiffinStart = new Date(start.setHours(1, 0, 0, 0)); // 1:00 AM
    const tiffinEnd = new Date(start.setHours(10, 0, 0, 0)); // 10:00 AM
    const lunchStart = new Date(start.setHours(11, 0, 0, 0)); // 11:00 AM
    const lunchEnd = new Date(start.setHours(15, 0, 0, 0)); // 3:00 PM
    const dinnerStart = new Date(start.setHours(16, 0, 0, 0)); // 4:00 PM
    const dinnerEnd = new Date(start.setHours(22, 0, 0, 0)); // 10:00 PM

    // Check Tiffin
    if (start <= tiffinEnd && end >= tiffinStart) {
        options.push('Tiffin');
    }
    // Check Lunch
    if (start <= lunchEnd && end >= lunchStart) {
        options.push('Lunch');
    }
    // Check Dinner
    if (start <= dinnerEnd && end >= dinnerStart) {
        options.push('Dinner');
    }

    return options;
}

export { getCateringOptions };