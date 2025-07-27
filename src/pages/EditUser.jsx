import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../features/users/userThunks';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.users.find((u) => u.id === parseInt(id)));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUser({ id: parseInt(id), first_name: firstName, last_name: lastName, email }));
        navigate('/users');
    };

    if (!user) return <p>User not found</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit User</h2>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default EditUser;
