import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings!', error);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/bookings/${id}`);
            setBookings(bookings.filter((booking) => booking.id !== id));
        } catch (error) {
            console.error('Error deleting booking!', error);
        }
    };

    return (
        <div>
            <h2>Hall Booking List</h2>
            <button onClick={() => navigate('/add-booking')}>Add Booking</button>
            <table border="1" style={{ marginTop: '10px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Applicant Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Rent</th>
                        <th>Additional Charges</th>
                        <th>Hall</th>
                        <th>Booking Type</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Application No</th>
                        <th>Remark</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.applicantName}</td>
                            <td>{booking.email}</td>
                            <td>{booking.mobile}</td>
                            <td>{booking.startDate}</td>
                            <td>{booking.endDate}</td>
                            <td>{booking.rent}</td>
                            <td>{booking.additionalCharges}</td>
                            <td>{booking.hall}</td>
                            <td>{booking.bookingType}</td>
                            <td>{booking.timeSlot}</td>
                            <td>{booking.status}</td>
                            <td>{booking.applicationNo}</td>
                            <td>{booking.remark}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-booking/${booking.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(booking.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
