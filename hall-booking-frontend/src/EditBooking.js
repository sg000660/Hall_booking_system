import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBooking = () => {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/${id}`);
                setFormData(response.data); // Set fetched data into formData
            } catch (error) {
                console.error('Error fetching booking!', error);
            }
        };
        fetchBooking();
    }, [id]); // id is included as a dependency to fetch new data when id changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        try {
            await axios.put(`http://localhost:8080/api/bookings/${id}`, formData);
            alert('Booking updated successfully!');
            navigate('/'); // Redirect back to the listing page
        } catch (error) {
            console.error('Error updating booking!', error);
            alert('Failed to update booking. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Booking</h2>
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
                <button type="submit">Update</button>
                <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default EditBooking;
