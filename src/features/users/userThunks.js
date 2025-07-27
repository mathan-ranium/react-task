import axios from 'axios';
import { setLoading, setUsers, setError } from './userSlice';

// ✅ Fetch users from API
export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://reqres.in/api/users?page=1', {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });
    dispatch(setUsers(response.data.data));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch users.'));
  } finally {
    dispatch(setLoading(false));
  }
};


// ✅ Remove user (client-side only)
export const removeUser = (userId) => (dispatch, getState) => {
  const { users } = getState().users;
  const updatedUsers = users.filter(user => user.id !== userId);
  dispatch(setUsers(updatedUsers));
};

// ✅ Edit user (client-side only)
export const editUser = (updatedUser) => (dispatch, getState) => {
  const { users } = getState().users;
  const updatedUsers = users.map(user =>
    user.id === updatedUser.id ? updatedUser : user
  );
  dispatch(setUsers(updatedUsers));
};

// ✅ Add user (client-side only for now)
export const addUser = (newUser) => (dispatch, getState) => {
  const { users } = getState().users;
  const id = Math.max(...users.map(user => user.id), 0) + 1;
  const updatedUsers = [...users, { ...newUser, id }];
  dispatch(setUsers(updatedUsers));
};
