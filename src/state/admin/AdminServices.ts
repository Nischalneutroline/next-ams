import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAppointmentFormSchema, AdminCustomerFormSchema } from "./admin";
import axios from "axios";
import { User } from "@/data/structure";
// Post User data
export const createUser = createAsyncThunk(
  "admin/user/add",
  async (formData: AdminCustomerFormSchema, { rejectWithValue }) => {
    const transformed = {
      email: formData.email,
      password: formData.password,
      name: formData.fullName,
      phone: formData.phone,
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
    console.log("Transformed Data:", payload);
    const response = await axios.put(`/api/user`, payload);
    return response.data;
  }
);

// Appointment Serivces

export const createAppointment = createAsyncThunk(
  "admin/appointment/add",
  async (formData: AdminAppointmentFormSchema, { rejectWithValue }) => {
    const transformed = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      serviceId: formData.serviceId,
      selectedDate: formData.selectedDate,
      selectedTime: formData.selectedTime,
      createdById: formData.createdById,
      isForSelf: formData.isForSelf,
      message: formData.message,
      user: formData.user,
    };
    console.log("Transformed Data:", transformed);
    try {
      const res = await axios.post("/api/appointment", transformed);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data || err.message);
    }
  }
);
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
export const updateAppointment = createAsyncThunk(
  "admin/updateAppointment",
  async (payload: any & { id: string }) => {
    console.log(payload, "inside Service");
    const { resourceId, ...updatedPayload } = payload;

    console.log("Transformed Data (without resourceId):", updatedPayload);
    const response = await axios.put(`/api/appointment`, updatedPayload);
    return response.data;
  }
);

export const deleteAppointment = createAsyncThunk(
  "admin/deleteAppointment",
  async (payload: {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    status: string;
    userId: string | null;
    bookedById: string | null;
    serviceId: string;
    selectedDate: string;
    selectedTime: string;
    message: string;
    isForSelf: boolean;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    resourceId: string | null;
  }) => {
    console.log("Deleting appointment with payload:", payload);
    const response = await axios.delete(`/api/appointment`, {
      data: payload, // 👈 this is required to pass body in DELETE request
    });
    return response.data;
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
