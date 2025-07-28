import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { validateUser } from '../utils/validators';
import UserTable from '../components/UserTable';
import UserCardGrid from '../components/UserCardGrid';
import UserModal from '../components/UserModal';
import ConfirmModal from '../components/ConfirmModal';
import { logout } from '../features/auth/authSlice'; // Update the path as needed
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Users = () => {
    const { users, loading, saveUser, deleteUser } = useUsers();

    const [viewType, setViewType] = useState('table'); // 'table' or 'card'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
    const [selectedUser, setSelectedUser] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [page, setPage] = useState(1);
    const usersPerPage = 5;
    const user = useSelector((state) => state.auth.user);

    const CardIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" fill="currentColor" />
            <rect x="14" y="3" width="7" height="7" fill="currentColor" />
            <rect x="14" y="14" width="7" height="7" fill="currentColor" />
            <rect x="3" y="14" width="7" height="7" fill="currentColor" />
        </svg>
    );

    const TableIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="2" fill="currentColor" />
            <rect x="3" y="10" width="18" height="2" fill="currentColor" />
            <rect x="3" y="16" width="18" height="2" fill="currentColor" />
        </svg>
    );

    const defaultFormData = {
        first_name: '',
        last_name: '',
        email: '',
        profile_link_image: '',
    };
        
    const [formData, setFormData] = useState(defaultFormData);


    const handleAdd = () => {
        setSelectedUser(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleEdit = user => {
        setSelectedUser(user);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDelete = user => {
        setUserToDelete(user);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) deleteUser(userToDelete.id);
        setConfirmOpen(false);
        setUserToDelete(null);
    };

    const handleFormSubmit = async formData => {
        const errors = validateUser(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const isEdit = modalMode === 'edit';
        const id = isEdit ? selectedUser?.id : null;
        await saveUser(formData, isEdit, id);
        setIsModalOpen(false);
        setFormErrors({}); // clear errors
    };


    const filteredUsersRaw = users?.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsersRaw.length / usersPerPage);
    const paginatedUsers = filteredUsersRaw.slice((page - 1) * usersPerPage, page * usersPerPage);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div onClick={handleLogout} className="bg-[#061429] text-white py-4 px-6 flex justify-end space-x-2 items-center">
                <span className="font-semibold text-lg">
                    {user ? `${user.first_name} ${user.last_name}` : "Guest"} {user}
                </span>
                <button
                    className="bg-red-500 hover:bg-red-600 p-1 rounded"
                    title="Logout"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                <h1 className='py-2 font-bold'>Users</h1>
                <div className="flex justify-between items-center mb-4">

                    <div className='flex space-x-3'>
                        <button onClick={() => setViewType(viewType === 'table' ? 'card' : 'table')} className={`text-sm ${viewType === 'table' ? 'text-blue-600 font-semibold border border-blue-400 rounded flex px-2 py-1' : 'text-gray-600 border border-gray-400 rounded flex px-2 py-1'}`}><TableIcon /><span>Table</span></button>
                        <button onClick={() => setViewType(viewType === 'table' ? 'card' : 'table')} className={`text-sm ${viewType === 'card' ? 'text-blue-600 font-semibold border border-blue-400 rounded flex px-2 py-1' : 'text-gray-600 border border-gray-400 rounded flex px-2 py-1'}`}><CardIcon /><span>Card</span></button>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-64">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="flex-grow px-4 py-2 focus:outline-none"
                            />
                            <div className="pr-3 text-gray-500">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <button
                            className="bg-blue-500 text-white px-4 py-1 ml-3 rounded-md"
                            onClick={handleAdd}
                        >
                            Create User
                        </button>
                    </div>

                </div>

                {viewType === 'table' ? (
                    <UserTable users={paginatedUsers} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
                ) : (
                    <UserCardGrid users={paginatedUsers} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
                )}

                <div className="flex justify-end items-center space-x-2 mt-6">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </div>

                <UserModal
                    formData={formData}
                    setFormData={setFormData}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setFormErrors({});
                        setFormData(defaultFormData);
                    }}
                    onSubmit={handleFormSubmit}
                    defaultValues={selectedUser} 
                    mode={modalMode}
                    errors={formErrors}
                />


                <ConfirmModal
                    isOpen={confirmOpen}
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmOpen(false)}
                    message={`Are you sure you want to delete ${userToDelete?.first_name}?`}
                />
            </div>
       </div>
    );
};

export default Users;
