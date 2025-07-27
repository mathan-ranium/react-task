import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, removeUser } from '../features/users/userThunks';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, loading, error, view } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(removeUser(id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button onClick={() => navigate('/create')}>Create New User</button>

            <h2>User List ({view} view)</h2>
            {users.map((user) => (
                <div key={user.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.email}</p>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Users;