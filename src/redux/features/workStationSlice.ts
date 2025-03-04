// src/redux/features/workStationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {WorkStationInitialState} from '@/types'
import Cookies from 'js-cookie';

const initialState:WorkStationInitialState = {
    data: [],
    isLoading: false,
    error: null,
};

const BASE_URL = "http://localhost:5050/api/";

export const fetchWorkStations = createAsyncThunk(
    'workStation/fetchWorkStations',
    async (_, { rejectWithValue, getState }) => {
        try {
           const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${BASE_URL}materials/workStation/${Cookies.get('userID')}`, config);
            return res.data.data;
        } catch (error:any) {
            return rejectWithValue(error || 'Failed to fetch materials');
        }
    }
);

const workStationSlice = createSlice({
    name: 'workStation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkStations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWorkStations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchWorkStations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default workStationSlice.reducer;