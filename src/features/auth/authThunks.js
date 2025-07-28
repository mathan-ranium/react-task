import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password },thunkAPI) => {
    try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // abort after 5 seconds

  const response = await axios.post(
    'https://reqres.in/api/login',
    {
      email,
      password,
    },
    {
      signal: controller.signal,headers:{"x-api-key":"reqres-free-v1"}
    }
  );

  clearTimeout(timeout);
  localStorage.setItem("token",response.data.token);

    return response.data;
      
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Request was cancelled due to timeout.");
    } else if (err.response) {
      console.log("Server responded with:", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data.error);
    } else {
      console.log("Unexpected error:", err);
      return thunkAPI.rejectWithValue("Network error or request failed");
    }
  }

});
