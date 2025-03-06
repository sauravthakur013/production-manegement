// src/redux/features/materialsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {MaterialInitialState} from '@/types'
import Cookies from 'js-cookie';

const initialState:MaterialInitialState = {
    materials: [],
    isLoading: false,
    error: null,
};

const BASE_URL = "https://prod-mange-backend.onrender.com/api/";

export const fetchMaterials = createAsyncThunk(
    'materials/fetchMaterials',
    async (_, { rejectWithValue }) => {
        try {
           const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${BASE_URL}materials/${Cookies.get('userID')}`, config);
            return res.data.data;
        } catch (error:any) {
            return rejectWithValue(error || 'Failed to fetch materials');
        }
    }
);

const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.materials = action.payload;
            })
            .addCase(fetchMaterials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default materialsSlice.reducer;