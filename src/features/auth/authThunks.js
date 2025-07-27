// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
  console.log("Before axios call");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // abort after 5 seconds

  const response = await axios.post(
    'https://reqres.in/api/login',
    {
      email,
      password,
    },
    {
      signal: controller.signal,
    }
  );

  clearTimeout(timeout);

  console.log("After axios call", response.data);
  return response.data;
} catch (err) {
  console.log("Caught error:", err.message);
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

  }
);
