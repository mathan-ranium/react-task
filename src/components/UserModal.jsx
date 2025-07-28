import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const UserModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
    mode,        
    errors,
    defaultValues
}) => {
    const isEditMode = mode === 'edit'; // Use this internally

    const defaultFormData = {
        first_name: '',
        last_name: '',
        email: '',
        profile_link_image: '',
    };

    useEffect(() => {
        if (isOpen) {
            setFormData(mode === 'edit' ? defaultValues : defaultFormData);
        }
    }, [isOpen, mode, defaultValues]);


    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const fields = [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'profile_link_image', label: 'Profile Image Link', type: 'text' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] sm:w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                        {isEditMode ? 'Edit User' : 'Create New User'}
                    </h3>
                    <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}
                    className="space-y-4">
                    {fields.map(({ name, label, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="text-red-500">*</span> {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={formData?.[name] || ''}
                                onChange={handleChange}
                                placeholder={`Please enter ${label.toLowerCase()}`}
                                className="w-full border p-2 rounded"
                            />
                            {errors?.[name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end mt-6 space-x-2">
                        <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            {isEditMode ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object,
    setFormData: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,         
    errors: PropTypes.object,                  
    defaultValues: PropTypes.object.isRequired,
};

export default UserModal;
