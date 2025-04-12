import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminCustomerFormSchema } from "./admin";
import axios from "axios";
import { User } from "@/data/structure";
// Post User data
export const createUser = createAsyncThunk(
  "admin/user/add",
  async (formData: AdminCustomerFormSchema, { rejectWithValue }) => {
    const transformed = {
      email: formData.email,
      password: formData.password,
      name: formData.full_name,
      phone: formData.phone_number,
      role: formData.role.toUpperCase(),
      isActive: formData.isActive,
      // address: {
      //   street: (formData as any).street, // if not in schema, cast or include it
      //   city: (formData as any).city,
      //   country: (formData as any).country,
      // },
    };
    console.log("Transformed Data:", transformed);
    try {
      const res = await axios.post("/api/user", transformed);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const retriveUsers = createAsyncThunk(
  "admin/user/view", // action type
  async (_, { rejectWithValue }) => {
    try {
      // Assuming the API endpoint for viewing a user is /api/users/{id}
      const response = await axios.get(`/api/user`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (payload: AdminCustomerFormSchema & { id: string }) => {
    const transformed = {
      email: payload.email,
      password: payload.password,
      name: payload.full_name,
      phone: payload.phone_number,
      role: payload.role.toUpperCase(),
      isActive: payload.isActive,
      // address: {
      //   street: (formData as any).street, // if not in schema, cast or include it
      //   city: (formData as any).city,
      //   country: (formData as any).country,
      // },
    };
    console.log("Transformed Data:", transformed);
    const response = await axios.put(`/api/user/${payload.id}`, transformed);
    return response.data;
  }
);

// Appointment Serivces
export const retriveAppointment = createAsyncThunk(
  "admin/appointment/view", // action type
  async (_, { rejectWithValue }) => {
    try {
      // Assuming the API endpoint for viewing a user is /api/users/{id}
      const response = await axios.get(`/api/appointment`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Services Serivces
export const retriveService = createAsyncThunk(
  "admin/service/view", // action type
  async (_, { rejectWithValue }) => {
    try {
      // Assuming the API endpoint for viewing a user is /api/users/{id}
      const response = await axios.get(`/api/service`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
