// src/app/control-tower/OperaterList.tsx
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/UI/Switch";
import { Clock, User, Mail, Building } from "lucide-react";
import { httpGet } from "@/utils/server";
import { Operator, OperatorListProps } from "@/types/index";
import toast, { Toaster } from "react-hot-toast";

function OperatorList({ initialOperators }: OperatorListProps) {
  const [operators, setOperators] = useState<Operator[]>(initialOperators);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOperators(initialOperators);
  }, [initialOperators]);

  const handleStatusChange = async (operatorId: string, newStatus: boolean) => {
    try {
      setLoading((prev) => ({ ...prev, [operatorId]: true }));
      await httpGet(`/api/auth//update/operaters/${operatorId}`);
      //   Update local state after successful API call
      toast.success("Status updated successfully");
      setOperators((prevOperators) =>
        prevOperators.map((operator) =>
          operator._id === operatorId
            ? { ...operator, allowForStatusChange: newStatus }
            : operator
        )
      );
    } catch (error:any) {
      console.error("Failed to update operator status:", error.response.data.message);
      toast.error(error.response.data.message);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading((prev) => ({ ...prev, [operatorId]: false }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <Toaster/>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Operator
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status Change Permission
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {operators.map((operator) => (
              <tr
                key={operator._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {operator.username}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        {operator.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Building className="h-4 w-4 mr-1.5 text-gray-500" />
                    {operator.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1.5" />
                    {formatDate(operator.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Switch
                      checked={operator.allowForStatusChange}
                      disabled={loading[operator._id]}
                      onCheckedChange={(checked: any) =>
                        handleStatusChange(operator._id, checked)
                      }
                      className={`${
                        loading[operator._id]
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                    <span className="ml-2">
                      {operator.allowForStatusChange
                        ? "Allowed"
                        : "Not allowed"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {operators.length === 0 && (
        <div className="text-center py-8 text-gray-500">No operators found</div>
      )}
    </div>
  );
}

export default OperatorList;
