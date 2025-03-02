// src/app/dashboard/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; 
import {loadUserFromLocalStorage}  from '@/redux/features/authSlice'; 

function Dashboard() {
  const USER = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  console.log('user--dashboardd-->', USER);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;