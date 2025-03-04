"use client";
import {
  UserCircle,
  Building,
  Mail,
  Shield,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import Navbar from "@/components/UI/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUserFromLocalStorage, logout } from "@/redux/features/authSlice";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/navigation";

function Profile() {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    // Implement logout functionality
    dispatch(logout());
    router.push('/login')
  };

  const handleBackToDashboard = () => {
    // Implement navigation to dashboard
    alert("Navigating to dashboard...");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          <div className="relative px-6 pb-8">
            <div className="absolute -top-16 left-6">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <UserCircle size={80} className="text-blue-500" />
              </div>
            </div>

            <div className="pt-16">
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.username || "niec"}
              </h1>
              <p className="text-gray-600">{user?.role || "role"}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{user?.email || "email"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-gray-800">{user?.role || "role"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-gray-800">
                        {user?.department || "departmnt"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Account Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-gray-800 font-mono text-sm break-all">
                      {user?._id || "WWWWW"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Status</p>
                    <p className="text-green-600 flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
