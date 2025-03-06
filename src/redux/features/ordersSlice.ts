import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {OrderInitialState, ProductionOrder} from '@/types'
import Cookies from 'js-cookie';

const initialState:OrderInitialState = {
    orders: [],
    isLoading: false,
    error: null,
};

const BASE_URL = "https://prod-mange-backend.onrender.com/api/";


export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.get(`${BASE_URL}orders`, config);
            return res.data.data;
        } catch (error:any) {
            return rejectWithValue(error || 'Failed to fetch orders');
        }
    }
);

 export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: ProductionOrder, { rejectWithValue }) => {
        try {
        const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.post(`${BASE_URL}orders`, orderData, config);
            return res.data;
        } catch (error:any) {
            return rejectWithValue(error || 'Failed to create order');
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
             .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default ordersSlice.reducer;