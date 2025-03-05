// src/redux/features/operaterSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {OperaterInitiatState} from '@/types'
import Cookies from 'js-cookie';

const initialState:  OperaterInitiatState = {
    operaters:[],
    isLoading: false,
    error:null,
}

const BASE_URL = "http://localhost:5050/api/";

export const fetchOperaters = createAsyncThunk(
    'operaters/fetchOperaters',
    async (_, { rejectWithValue }) => {
        try {
           const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${BASE_URL}auth/control-tower/operaters`, config);
            return res.data.data;
        } catch (error:any) {
            return rejectWithValue(error || 'Failed to fetch operaters');
        }
    }
);

const operatersSlice = createSlice({
    name: 'operaters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOperaters.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOperaters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.operaters = action.payload;
            })
            .addCase(fetchOperaters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default operatersSlice.reducer;