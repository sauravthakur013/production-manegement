import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {MaterialInitialState} from '@/types'

const initialState:MaterialInitialState = {
    materials: [],
    isLoading: false,
    error: null,
};

export const fetchMaterials = createAsyncThunk(
    'materials/fetchMaterials',
    async (_, { rejectWithValue, getState }) => {
        try {
           const token = (getState() as any).auth.user.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/materials`, config);
            return data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch materials');
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