import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        applicantName: '',
        email: '',
        mobile: '',
        startDate: '',
        endDate: '',
        rent: '',
        additionalCharges: '',
        hall: '',
        bookingType: '',
        timeSlot: '',
        status: '',
        applicationNo: '',
        remark: '',
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.applicantName.trim()) newErrors.applicantName = 'Applicant Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }
        if (!formData.startDate) newErrors.startDate = 'Start Date is required';
        if (!formData.endDate) newErrors.endDate = 'End Date is required';
        if (!formData.rent) newErrors.rent = 'Rent is required';
        if (!formData.hall.trim()) newErrors.hall = 'Hall is required';
        if (!formData.bookingType.trim()) newErrors.bookingType = 'Booking Type is required';
        if (!formData.timeSlot.trim()) newErrors.timeSlot = 'Time Slot is required';
        if (!formData.status.trim()) newErrors.status = 'Status is required';
        if (!formData.applicationNo.trim()) newErrors.applicationNo = 'Application Number is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        try {
            await axios.post('http://localhost:8080/api/bookings', formData);
            alert('Booking added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding booking!', error);
            alert('Failed to add booking. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Applicant Name:</label>
                    <input
                        type="text"
                        name="applicantName"
                        value={formData.applicantName}
                        onChange={handleChange}
                    />
                    {errors.applicantName && <span style={{ color: 'red' }}>{errors.applicantName}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div>
                    <label>Mobile:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                    {errors.mobile && <span style={{ color: 'red' }}>{errors.mobile}</span>}
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    {errors.startDate && <span style={{ color: 'red' }}>{errors.startDate}</span>}
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                    {errors.endDate && <span style={{ color: 'red' }}>{errors.endDate}</span>}
                </div>
                <div>
                    <label>Rent:</label>
                    <input type="number" name="rent" value={formData.rent} onChange={handleChange} />
                    {errors.rent && <span style={{ color: 'red' }}>{errors.rent}</span>}
                </div>
                <div>
                    <label>Additional Charges:</label>
                    <input
                        type="number"
                        name="additionalCharges"
                        value={formData.additionalCharges}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Hall:</label>
                    <input type="text" name="hall" value={formData.hall} onChange={handleChange} />
                    {errors.hall && <span style={{ color: 'red' }}>{errors.hall}</span>}
                </div>
                <div>
                    <label>Booking Type:</label>
                    <input
                        type="text"
                        name="bookingType"
                        value={formData.bookingType}
                        onChange={handleChange}
                    />
                    {errors.bookingType && <span style={{ color: 'red' }}>{errors.bookingType}</span>}
                </div>
                <div>
                    <label>Time Slot:</label>
                    <input type="text" name="timeSlot" value={formData.timeSlot} onChange={handleChange} />
                    {errors.timeSlot && <span style={{ color: 'red' }}>{errors.timeSlot}</span>}
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" name="status" value={formData.status} onChange={handleChange} />
                    {errors.status && <span style={{ color: 'red' }}>{errors.status}</span>}
                </div>
                <div>
                    <label>Application Number:</label>
                    <input
                        type="text"
                        name="applicationNo"
                        value={formData.applicationNo}
                        onChange={handleChange}
                    />
                    {errors.applicationNo && <span style={{ color: 'red' }}>{errors.applicationNo}</span>}
                </div>
                <div>
                    <label>Remark:</label>
                    <textarea name="remark" value={formData.remark} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Submit</button><button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
                Back
            </button>
            </form>
        </div>
    );
};

export default Booking;
