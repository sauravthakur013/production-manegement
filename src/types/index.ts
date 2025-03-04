export interface User {
    _id:string,
    username: string;
    email: string;
    role: 'Manager' | 'Operator';
    department: string;
    token:string
  }
  
  export interface AuthInitialState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ProductionOrder {
      productName: string;
      quantity: number;
      priority: 'High' | 'Medium' | 'Low';
      materialsUsed: MaterialUsed[];
      workstationId: string;
      startDate: Date;
      endDate: Date;
  }
  
  export interface OrderInitialState {
    orders: any[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface MaterialUsed {
      materialId: string;
      quantity: number;
  }
  
  export interface MaterialInitialState {
    materials: any[];
    isLoading: boolean;
    error: string | null;
  }

  export interface WorkStationInitialState {
    data: any[];
    isLoading: boolean;
    error: string | null;
  }

  export interface OperaterInitiatState{
    operaters: any[],
    isLoading: boolean;
    error: string | null;
  }

  export interface Operator {
    _id: string;
    username: string;
    email: string;
    department: string;
    createdAt: string;
    allowForStatusChange: boolean;
  }
  
  export interface OperatorListProps {
    initialOperators: Operator[];
  }



  export interface Material {
    _id: string;
    name: string;
  }
  
  export interface Workstation {
    id: string;
    name: string;
  }
  
  export interface MaterialUsage {
    materialId: string;
    quantity: number;
  }
  
  export interface OrderFormData {
    productName: string;
    quantity: number;
    priority: "High" | "Medium" | "Low";
    workstationId: string;
    startDate: string;
    endDate: string;
    materialsUsed: MaterialUsage[];
  }
  
  export interface AddOrdersProps {
    materials: any[];
    workstations: any[];
  }