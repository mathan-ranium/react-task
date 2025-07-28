import { useDispatch, useSelector } from 'react-redux';
import { getusers, createUser, editUser, removeUser } from '../features/users/userThunks';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const useUsers = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.userSlice);

    useEffect(() => {
        dispatch(getusers());
    }, [dispatch]);

    const saveUser = async (data, isEdit = false, id = null) => {
        try {
            if (isEdit) {
                await dispatch(editUser({ id, ...data })).unwrap();
                toast.success("User updated successfully");
            } else {
                await dispatch(createUser(data)).unwrap();
                toast.success("User created successfully");
            }
        } catch {
            toast.error(`Failed to ${isEdit ? 'update' : 'create'} user`);
        } finally {
            dispatch(getusers());
        }
    };

    const deleteUser = async (id) => {
        try {
            await dispatch(removeUser(id)).unwrap();
            toast.success("User deleted successfully");
            dispatch(getusers());
        } catch {
            toast.error("Failed to delete user");
        }
    };

    return { users, loading, error, saveUser, deleteUser };
};
