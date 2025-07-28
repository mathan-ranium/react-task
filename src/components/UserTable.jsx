import React from 'react';
import PropTypes from 'prop-types';

const UserTable = ({ users, onEdit, onDelete }) => (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-3">Email</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center space-x-2">
                        <img src={user.avatar} alt={user.email} className="w-8 h-8 rounded-full" />
                        <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
                    </td>
                    <td className="p-3">{user.first_name}</td>
                    <td className="p-3">{user.last_name}</td>
                    <td className="p-3 space-x-2">
                        <button onClick={() => onEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserTable;
