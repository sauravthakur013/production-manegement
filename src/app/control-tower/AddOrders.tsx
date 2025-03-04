// src/app/control-tower/AddOrders.tsx
import React, { useState, useEffect } from "react";
import { Plus, X, Check, Loader } from "lucide-react";

import { createOrder } from "@/redux/features/ordersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useSelector } from "react-redux";
import {
  Material,
  Workstation,
  MaterialUsage,
  OrderFormData,
  AddOrdersProps,
} from "@/types/index";

const AddOrderForm: React.FC<AddOrdersProps> = ({
  materials,
  workstations,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    productName: "",
    quantity: 1,
    priority: "Medium",
    workstationId: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    materialsUsed: [{ materialId: "", quantity: 1 }],
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (showSuccess) setShowSuccess(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMaterialChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedMaterials = [...formData.materialsUsed];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      materialsUsed: updatedMaterials,
    });
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      materialsUsed: [
        ...formData.materialsUsed,
        { materialId: "", quantity: 1 },
      ],
    });
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = [...formData.materialsUsed];
    updatedMaterials.splice(index, 1);

    setFormData({
      ...formData,
      materialsUsed: updatedMaterials,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting state BEFORE the API call

    const payload: any = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    try {
      await dispatch(createOrder(payload)); // Wait for the createOrder action to complete
      setShowSuccess(true);
      setFormData({
        productName: "",
        quantity: 1,
        priority: "Medium",
        workstationId: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        materialsUsed: [{ materialId: "", quantity: 1 }],
      });

      setTimeout(() => {
        setShowSuccess(false);
        setIsExpanded(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out border border-gray-200">
      {/* Header */}
      <div
        className="bg-blue-600 p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-white font-semibold text-lg flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Add Production Order
        </h2>
        {isExpanded && (
          <X className="h-5 w-5 text-white hover:text-gray-200 transition-colors" />
        )}
      </div>

      {/* Form Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {showSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Order Created Successfully!
            </h3>
            <p className="text-gray-600">
              Your production order has been added to the system.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter product name"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Workstation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workstation
                </label>
                <select
                  name="workstationId"
                  value={formData.workstationId}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Workstation</option>
                  {workstations.map((station) => (
                    <option key={station._id} value={station._id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Materials Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Materials Used
                </h3>
                <button
                  type="button"
                  onClick={addMaterial}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Material
                </button>
              </div>

              {formData.materialsUsed.map((material, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-end gap-4 mb-4 p-4 bg-white rounded-md border border-gray-200"
                >
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material
                    </label>
                    <select
                      value={material.materialId}
                      onChange={(e) =>
                        handleMaterialChange(
                          index,
                          "materialId",
                          e.target.value
                        )
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select Material</option>
                      {materials.map((mat) => (
                        <option key={mat._id} value={mat._id}>
                          {mat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={material.quantity}
                      onChange={(e) =>
                        handleMaterialChange(
                          index,
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {formData.materialsUsed.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  "Create Order"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddOrderForm;
