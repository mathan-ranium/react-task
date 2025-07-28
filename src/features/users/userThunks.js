import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeUser,fetchUsers ,updateUser,deleteUser} from "./userActions";

export const getusers=createAsyncThunk("userThunk/getUsers",fetchUsers,)
export const createUser=createAsyncThunk("userThunk/createUser",storeUser,)
export const editUser=createAsyncThunk("userThunk/editUser",updateUser)
export const removeUser=createAsyncThunk("userThunk/editUser",deleteUser)