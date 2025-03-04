// src/app/dashboard/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; 
import {loadUserFromLocalStorage}  from '@/redux/features/authSlice'; 
import Loader from '@/components/UI/Loader';
import Navbar from '@/components/UI/Navbar';

function Dashboard() {
  const USER = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  if(!USER.user) {
    return <Loader/>
  }

  console.log('user--dashboardd-->', USER);

  return (
    <div>
      <Navbar/>
      <div className='mt-18'>
      </div>
    </div>
  );
}

export default Dashboard;