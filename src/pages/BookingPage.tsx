import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [cateringOption, setCateringOption] = useState('');

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleCateringChange = (event) => {
        setCateringOption(event.target.value);
    };

    const bookingSummary = () => {
        return (
            <div>
                <h3>Booking Summary</h3>
                <p>Date: {startDate.toLocaleDateString()}</p>
                <p>Time: {selectedTime}</p>
                <p>Catering: {cateringOption}</p>
            </div>
        );
    };

    return (
        <div>
            <h1>Booking Page</h1>
            <div>
                <label>Select Date:</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
                <label>Select Time:</label>
                <select value={selectedTime} onChange={handleTimeChange}>
                    <option value="">Select a time</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                </select>
            </div>
            <div>
                <label>Select Catering:</label>
                <select value={cateringOption} onChange={handleCateringChange}>
                    <option value="">Select catering option</option>
                    <option value="Standard">Standard</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-free">Gluten-free</option>
                </select>
            </div>
            {bookingSummary()}
        </div>
    );
};

export default BookingPage;