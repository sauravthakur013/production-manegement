// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import ordersReducer from './features/ordersSlice';
import materialsReducer from './features/materialsSlice';
import workStationReducer from './features/workStationSlice';
import operaterReducer from './features/operaterSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        materials: materialsReducer,
        workStation: workStationReducer,
        operaters: operaterReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;