// src/app/control-tower/page.tsx
"use client";
import Navbar from "@/components/UI/Navbar";
import React, { useEffect } from "react";
import AddOrders from "./AddOrders";

import { fetchMaterials } from "@/redux/features/materialsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useSelector } from "react-redux";
import { fetchWorkStations } from "@/redux/features/workStationSlice";
import { fetchOperaters } from "@/redux/features/operaterSlice"
import OperaterList from "./OperaterList";

function ControlTower() {
  const { materials } = useSelector((state: RootState) => state.materials);
  const { data } = useSelector((state: RootState) => state.workStation);
  const { operaters } = useSelector((state: RootState) => state.operaters);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMaterials());
    dispatch(fetchWorkStations());
    dispatch(fetchOperaters());
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-24 px-8 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Production Control Tower
          </h1>
          <p className="text-gray-600">
            Manage and monitor production orders across your manufacturing
            facility
          </p>
        </div>
        <AddOrders materials={materials} workstations={data} />
        <div className=" mt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Operaters List
          </h1>
          <p className="text-gray-600">
            Allow them to change the status of orders. (Manager Access)
          </p>
        </div>

        <OperaterList initialOperators={operaters}/>


      </div>
    </div>
  );
}

export default ControlTower;
