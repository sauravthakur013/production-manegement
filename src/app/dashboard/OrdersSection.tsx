// src/app/dashboard/OrdersSection.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  MoreHorizontal,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { httpGet } from "@/utils/server";



interface Material {
  _id: string;
  name: string;
  currentStock: number;
  minimumStockLevel: number;
}

interface MaterialUsed {
  materialId: Material;
  quantity: number;
  _id: string;
}

interface Workstation {
  _id: string;
  name: string;
  status: string;
}

interface CreatedBy {
  allowForStatusChange: boolean;
  _id: string;
  username: string;
  email: string;
  role: string;
  department: string;
  createdAt: string; // Or Date if you prefer to work with Date objects
  updatedAt: string; // Or Date
  __v: number;
}

export type OrderStatus =
  | "Planned"
  | "In Production"
  | "Quality Check"
  | "Completed";

interface OrderItem {
  _id: string;
  productName: string;
  quantity: number;
  priority: "High" | "Medium" | "Low"; // Define possible values
  status: OrderStatus; // Define possible values
  materialsUsed: MaterialUsed[];
  workstationId: Workstation;
  startDate: string; // Or Date
  endDate: string; // Or Date
  createdBy: CreatedBy;
  orderId: string;
  createdAt: string; // Or Date
  updatedAt: string; // Or Date
  __v: number;
}

interface OrderSection {
  orderList: OrderItem[];
  // Removed: onStatusChange: (orderId: string, newStatus: OrderStatus) => void; // Removed status change handler
}

const OrdersSection = ({ orderList }: OrderSection) => {
  const [selectedStatus, setSelectedStatus] = useState<"All" | OrderStatus>(
    "All"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const tableRowRefs = useRef<HTMLTableRowElement[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>(orderList); // Local state for orders

  useEffect(() => {
    setOrders(orderList); // Sync local state with prop
  }, [orderList]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Production":
        return "bg-blue-100 text-blue-800"; // Changed from "In Progress"
      case "Quality Check":
        return "bg-purple-100 text-purple-800"; // Added color for Quality Check
      case "Planned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Filter the orders based on the selected status
  const filteredOrders = React.useMemo(() => {
    if (selectedStatus === "All") {
      return orders; // Use local state 'orders'
    }
    return orders.filter((order) => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the filtered orders array to get the orders for the current page
  const currentOrders = React.useMemo(
    () => filteredOrders.slice(startIndex, endIndex),
    [filteredOrders, startIndex, endIndex]
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  const handleStatusChange = async (
    order: OrderItem,
    orderId: string,
    newStatus: OrderStatus
  ) => {

    if(Cookies.get('role') !== 'Manager' && Cookies.get('allowForStatusChange') !== 'true') {
      toast.error("You don't have permission to change status");
      return;
    }

    console.log('newStatus', newStatus)



    // Optimistically update local state
    

    try {
      await httpGet(`/api/orders/${orderId}/status/${newStatus}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order ${order.orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    tableRowRefs.current = tableRowRefs.current.slice(0, currentOrders.length); // Keep the refs array in sync with current orders
  }, [currentOrders]);

  const statusOptions: OrderStatus[] = [
    "Planned",
    "In Production",
    "Quality Check",
    "Completed",
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <Toaster/>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
          Recent Orders
        </h2>
        {/* <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div> */}
      </div>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        {["All", "Planned", "In Production", "Quality Check", "Completed"].map(
          (status) => (
            <button
              key={status}
              onClick={() =>
                setSelectedStatus(
                  status as
                    | "All"
                    | "Planned"
                    | "In Production"
                    | "Quality Check"
                    | "Completed"
                )
              }
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                selectedStatus === status
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {status} {status !== "All" && (orders.filter((order) => order.status === status).length)}
            </button>
          )
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr
                  className="hover:bg-gray-50"
                  ref={(el) => {
                    if (el) {
                      tableRowRefs.current[index] = el;
                    }
                  }}
                >
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderId}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">
                          {order.productName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {order.quantity}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

               {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <div className="relative">
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => toggleOrderDetails(order._id)}
                            className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-150"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 mb-2">
                              Order Information
                            </h4>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Order ID:</span>{" "}
                                {order.orderId}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Product:</span>{" "}
                                {order.productName}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Quantity:</span>{" "}
                                {order.quantity}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Priority:</span>{" "}
                                {order.priority}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-md font-semibold text-gray-800 mb-2">
                              Production Details
                            </h4>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Start Date:</span>{" "}
                                {formatDate(order.startDate)}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">End Date:</span>{" "}
                                {formatDate(order.endDate)}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Created By:</span>{" "}
                                {order.createdBy.username}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Workstation:</span>{" "}
                                {order.workstationId.name}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-md font-semibold text-gray-800 mb-2">
                            Materials Used
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            {order.materialsUsed.map((materialUsed) => (
                              <li key={materialUsed._id}>
                                {materialUsed.materialId.name} - Qty:{" "}
                                {materialUsed.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor={`status-select-${order._id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Update Status:
                          </label>
                          <div className="mt-1 relative">
                            <select
                              id={`status-select-${order._id}`}
                              className="block w-full pl-3 pr-5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order,
                                  order._id,
                                  e.target.value as OrderStatus
                                )
                              }
                            >
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            {/* <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-2 text-gray-400">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-gray-500 mb-2 sm:mb-0">
          Showing
          <span className="font-medium mx-1">{startIndex + 1}</span>
          to
          <span className="font-medium mx-1">
            {Math.min(endIndex, filteredOrders.length)}
          </span>
          of <span className="font-medium">{filteredOrders.length}</span>{" "}
          results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;
