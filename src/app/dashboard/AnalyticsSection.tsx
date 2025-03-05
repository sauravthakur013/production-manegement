// src/app/dashboard/AnalyticsSection.tsx
import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  CreditCard,
  RefreshCw,
  PackageCheck,
  Factory,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { httpGet } from "@/utils/server";
import toast, { Toaster } from "react-hot-toast";
import CountUp from 'react-countup';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface AnalyticsData {
  totalProducts: number;
  productStatusCounts: {
    Completed: number;
    "In Production": number;
    Planned: number;
  };
  materialUsage: { name: string; value: number }[];
  workstationUsage: { name: string; value: number }[];
}

const AnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAnalyticsData = async () => {
    setLoading(true);
    try {
      const response:any = await httpGet("/api/analytics/overview");
      if (response.status === 200 && response.data.data) {
        setAnalyticsData(response.data.data);
      } else {
        setError("Failed to fetch analytics data.");
      }
    } catch (error: any) {
      console.error("Error fetching analytics data:", error);
      setError(error.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading analytics data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!analyticsData) {
    return <div className="p-6">No analytics data available.</div>;
  }

  const {
    totalProducts,
    productStatusCounts,
    materialUsage,
    workstationUsage,
  } = analyticsData;

  const completedProducts = productStatusCounts.Completed || 0;
  const inProductionProducts = productStatusCounts["In Production"] || 0;
  const plannedProducts = productStatusCounts.Planned || 0;
  const qualityCheckProducts = 0; // Assuming this is always 0 as it's not in the provided API response. Add a default value or fetch it from the API if available.

  const productStatusData = [
    { name: "Completed", value: completedProducts },
    { name: "In Production", value: inProductionProducts },
    { name: "Planned", value: plannedProducts },
    { name: "Quality Check", value: qualityCheckProducts },
  ];

  const totalProductsPercentage = totalProducts > 0 ? 100 : 0;
  const completedProductsPercentage = totalProducts > 0 ? (completedProducts / totalProducts) * 100 : 0;
  const inProductionProductsPercentage = totalProducts > 0 ? (inProductionProducts / totalProducts) * 100 : 0;
  const plannedProductsPercentage = totalProducts > 0 ? (plannedProducts / totalProducts) * 100 : 0;

  const cardStyle = "bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-transform transform hover:scale-105 hover:shadow-md hover:border-blue-200"; // Added hover effects

  return (
    <div className="p-6">
      <Toaster/>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Analytics Overview</h2>
        <div className="flex items-center text-sm text-gray-500">
          <span>Last 7 days</span>
          <button className="ml-2 p-1 rounded-full hover:bg-gray-100" onClick={()=>{
            getAnalyticsData();
            toast.success("Data Refreshed");
          }}>
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={cardStyle}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <h3 className="text-2xl font-bold">
                <CountUp end={totalProducts} />
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-green-500 text-sm font-medium">
              {/* <ArrowUpRight className="w-3 h-3 mr-1" /> */}
              <CountUp end={totalProductsPercentage} suffix="%" decimals={0} />
            </span>
            <span className="text-xs text-gray-500 ml-2">
              of planned products
            </span>
          </div>
        </div>

        <div className={cardStyle}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed Products</p>
              <h3 className="text-2xl font-bold"><CountUp end={completedProducts} /></h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <PackageCheck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-green-500 text-sm font-medium">
              {/* <ArrowUpRight className="w-3 h-3 mr-1" /> */}
              <CountUp end={completedProductsPercentage} suffix="%" decimals={1} />
            </span>
            <span className="text-xs text-gray-500 ml-2">of all products</span>
          </div>
        </div>

        <div className={cardStyle}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                Products In Production
              </p>
              <h3 className="text-2xl font-bold"><CountUp end={inProductionProducts} /></h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Factory className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-green-500 text-sm font-medium">
              {/* <ArrowUpRight className="w-3 h-3 mr-1" /> */}
              <CountUp end={inProductionProductsPercentage} suffix="%" decimals={1} />
            </span>
            <span className="text-xs text-gray-500 ml-2">of all products</span>
          </div>
        </div>

        <div className={cardStyle}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Planned Products</p>
              <h3 className="text-2xl font-bold"><CountUp end={plannedProducts} /></h3>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <CreditCard className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-green-500 text-sm font-medium">
              {/* <ArrowDownRight className="w-3 h-3 mr-1" /> */}
              <CountUp end={plannedProductsPercentage} suffix="%" decimals={1} />
            </span>
            <span className="text-xs text-gray-500 ml-2">of all products</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">
            Product Status Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {productStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Materials Used</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={materialUsage}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Workstation Usage Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6">
        <h3 className="text-lg font-semibold mb-4">Workstation Usage</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={workstationUsage}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#D8B4FE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> 
      
    </div>
  );
};

export default AnalyticsSection;