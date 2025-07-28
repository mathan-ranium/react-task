import React from 'react';
import PropTypes from 'prop-types';

const UserCardGrid = ({ users, onEdit, onDelete }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
            <div key={user.id} className="relative p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-all">
                <img src={user.avatar} alt={user.email} className="w-20 h-20 rounded-full mx-auto" />
                <h3 className="text-center font-bold text-lg mt-2">{user.first_name} {user.last_name}</h3>
                <p className="text-center text-gray-600">{user.email}</p>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(user)} className="bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600">✏️</button>
                    <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">🗑️</button>
                </div>
            </div>
        ))}
    </div>
);

UserCardGrid.propTypes = {
    users: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserCardGrid;
