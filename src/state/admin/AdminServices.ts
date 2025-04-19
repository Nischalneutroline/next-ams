import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AdminAppointmentFormSchema,
  AdminCustomerFormSchema,
  AdminResourceFormSchema,
} from "./admin";
import axios from "axios";
import {
  BusinessDetail,
  Service,
  SupportBusinessDetail,
  User,
} from "@/data/structure";
// Post User data
export const createUser = createAsyncThunk(
  "admin/user/add",
  async (formData: AdminCustomerFormSchema, { rejectWithValue }) => {
    const transformed = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
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

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",

  async (payload: {
    createdAt: string;
    emal: string;
    id: string;
    isActive: true;
    lastActive: string;
    name: string;
    password: string;
    phone: string;
    role: string;
    updatedAt: string;
  }) => {
    const { updatedAt, lastActive, createdAt, ...transformedData } = payload;
    console.log("Deleting appointment with payload:", transformedData);
    const response = await axios.delete(`/api/user`, {
      data: transformedData, // 👈 this is required to pass body in DELETE request
    });
    return response.data;
  }
);

// Appointment Serivces

export const createAppointment = createAsyncThunk(
  "admin/appointment/add",
  async (formData: AdminAppointmentFormSchema, { rejectWithValue }) => {
    console.log(formData);
    const transformed = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      serviceId: formData.serviceId,
      selectedDate: formData.selectedDate,
      selectedTime: formData.selectedTime,
      message: formData.message,
      userId: "cm9gu8ms60000vdg0zdnsxb6z",
      isForSelf: false,
      bookedById: "cm9gu8ms60000vdg0zdnsxb6z",
      createdById: "cm9gu8ms60000vdg0zdnsxb6z",
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
  async (formData: any & { id: string }) => {
    console.log(formData, "inside Service");
    const { resourceId, ...payload } = formData;
    const response = await axios.put(`/api/appointment`, payload);
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
export const createService = createAsyncThunk(
  "admin/business/add",
  async (formData: Service, { rejectWithValue }) => {
    const transformedData = {
      ...formData,
      status: formData.status ?? "ACTIVE",
    };
    try {
      const res = await axios.post("/api/service", formData);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data || err.message);
    }
  }
);
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
export const updateService = createAsyncThunk(
  "admin/updateService",
  async (formData: any) => {
    console.log(formData, "inside Service");
    const { resourceId, ...payload } = formData;
    const response = await axios.put(`/api/service`, payload);
    return response.data;
  }
);
export const deleteService = createAsyncThunk(
  "admin/deleteAppointment",
  async (payload: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    status: string;
    estimatedDuration: number;
    businessDetailsId: string;
  }) => {
    console.log("Deleting appointment with payload:", payload);
    const response = await axios.delete(`/api/service`, {
      data: payload, // 👈 this is required to pass body in DELETE request
    });
    return response.data;
  }
);

// Business
export const createBusiness = createAsyncThunk(
  "admin/business/add",
  async (formData: BusinessDetail, { rejectWithValue }) => {
    console.log("Transformed Data:", formData);
    try {
      const res = await axios.post("/api/business-detail", formData);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data || err.message);
    }
  }
);
export const retrieveBusiness = createAsyncThunk(
  "admin/business/view",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/business-detail");
      return response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Resource Staff/Admin
export const createStaff = createAsyncThunk(
  "admin/business/add",
  async (formData: AdminResourceFormSchema, { rejectWithValue }) => {
    const transformedData = {
      ...formData,
      businessId: "cm9gvwy4s0003vdg0f24wf178",
    };
    try {
      const res = await axios.post("/api/resource", transformedData);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const retriveStaff = createAsyncThunk(
  "admin/resource/staff/view", // action type
  async (_, { rejectWithValue }) => {
    try {
      // Assuming the API endpoint for viewing a user is /api/users/{id}
      const response = await axios.get(`/api/resource`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "admin/resource/staff/delete",
  async (payload) => {
    console.log("Deleting appointment with payload:", payload);
    const response = await axios.delete(`/api/resource`, {
      data: payload, // 👈 this is required to pass body in DELETE request
    });
    return response.data;
  }
);

// Support Business details

export const createSupportBusinessDetails = createAsyncThunk(
  "admin/support-business-detail/add",
  async (formData: any, { rejectWithValue }) => {
    const transformedData = {
      ...formData,
      businessId: "cm9gvwy4s0003vdg0f24wf178",
    };
    try {
      const res = await axios.post(
        "/api/support-business-deatil",
        transformedData
      );
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data || err.message);
    }
  }
);
