// src/pages/CreateUser.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/userThunks';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));
        navigate('/');
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
                <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateUser;
