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
