import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {AuthInitialState, User } from '@/types/index';

const initialState: AuthInitialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};


export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: any, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                userData,
                config
            );

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(data));

            return data; // Return the user data on success
        } catch (error:any) {
            // Handle errors and return a rejection with an error message
            return rejectWithValue(error.response.data.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: any, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                userData,
                config
            );

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(data));

            return data; // Return the user data on success
        } catch (error:any) {
            // Handle errors and return a rejection with an error message
            return rejectWithValue(error.response.data.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user'); // Clear user data from local storage
        },
        // Add a reducer to load user data from local storage on app initialization
        loadUserFromLocalStorage: (state) => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    state.user = user;
                    state.token = user.token; // Assuming the token is stored with the user
                }
            } catch (error) {
                console.error("Error loading user from local storage:", error);
                // Handle error appropriately, maybe set state to a default or error state
            }
        },
        // Reducer to set the user data (registration data in this case)
        setUserData: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
            // You can choose to store in local storage here as well if needed
            // localStorage.setItem('registrationData', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, loadUserFromLocalStorage,setUserData } = authSlice.actions;
export default authSlice.reducer;