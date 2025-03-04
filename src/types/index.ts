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