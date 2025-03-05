// src/app/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrders } from "@/redux/features/ordersSlice";
import Navbar from "@/components/UI/Navbar";
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrdersSection from "./OrdersSection";
import AnalyticsSection from "./AnalyticsSection";
import CountUp from "react-countup";

function Dashboard() {
  const { orders } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true); // Optionally, keep it open on larger screens
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const tabs = [
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    // {
    //   id: "graphs",
    //   label: "Graphs & Tables",
    //   icon: <BarChart3 className="w-5 h-5" />,
    // },
  ];

  console.log(orders);

  return (
    <div>
      <Navbar />

      <div className=" flex ">
        {/* ---- side bar --- */}
        <div
          className={` ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-white shadow-lg transition-all duration-300 ease-in-out z-10 h-screen pt-16`}
        >
          <nav className=" pt-5">
            <ul>
              {tabs.map((tab) => (
                <li key={tab.id} className="mb-2 px-4">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {isSidebarOpen && (
                      <span className=" text-nowrap">{tab.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* --- page content --- */}
        <div className="w-full  mt-16 ">
          <main className="flex-1 overflow-y-auto p-6 h-[calc(100vh-65px)]  ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-semibold"><CountUp end={orders.length} /></p>
                  <p className="text-xs text-green-500 text-nowrap">+12% from last month</p>
                </div>
              </div>
              {/* <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-semibold">$24,568</p>
                  <p className="text-xs text-green-500">+8% from last month</p>
                </div>
              </div> */}
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-2xl font-semibold"><CountUp end={16} /></p>
                  <p className="text-xs text-green-500">+5% from last month</p>
                </div>
              </div>
            </div>

            <div className="">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md"
                >
                  {activeTab === "orders" && (
                    <OrdersSection orderList={orders} />
                  )}
                  {activeTab === "analytics" && <AnalyticsSection />}
                  {/* {activeTab === "graphs" && <GraphsSection productionData={orders} />} */}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
