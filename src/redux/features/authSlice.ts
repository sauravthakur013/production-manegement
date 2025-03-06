// src/redux/features/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthInitialState } from "@/types/index";
import Cookies from "js-cookie";

const initialState: AuthInitialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const BASE_URL = "https://prod-mange-backend.onrender.com/api/";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}auth/register`,
        userData,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}auth/login`,
        userData,
        config
      );
      console.log(data);

      Cookies.set("token", data.data.token);
      Cookies.set("userID", data.data._id);
      Cookies.set("role", data.data.role);
      Cookies.set("username", data.data.username);
      Cookies.set("email", data.data.email);
      Cookies.set("department", data.data.department);
      Cookies.set("allowForStatusChange", data.data.allowForStatusChange);
      
      return data; // Return the user data on success
    } catch (error: any) {
      // Handle errors and return a rejection with an error message
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Clear cookies on logout
      Cookies.remove("token");
      Cookies.remove("userID");
      Cookies.remove("role");
      Cookies.remove("username");
      Cookies.remove("email");
      Cookies.remove("department");
      Cookies.remove("allowForStatusChange");
    },
    // Add a reducer to load user data from local storage on app initialization
    loadUserFromLocalStorage: (state ?:any ) => {
      try {
        // Load user data from cookies
        const token = Cookies.get("token");
        const userID = Cookies.get("userID");
        const role = Cookies.get("role");
        const username = Cookies.get("username");
        const email = Cookies.get("email");
        const department = Cookies.get("department");

        if (token && userID) {
          state.token = token;
          state.user = {
            _id: userID,
            role: role || "Operator",
            username: username || "",
            email: email || "",
            department: department || "",
            token: token,
          };
          state.isLoading = false;
        }
      } catch (error) {
        console.error("Error loading user from local storage:", error);
        // Handle error appropriately, maybe set state to a default or error state
      }
    },
    // Reducer to set the user data (registration data in this case)
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadUserFromLocalStorage, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
