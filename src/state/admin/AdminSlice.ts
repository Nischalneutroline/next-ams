import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminSliceSchema,
  InitialServiceData,
  //   AdminUserFormSchema,
  //   ServiceType,
  //   APiType,
} from "./admin";

const API_URL = process.env.DATABASE_URL;

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${API_URL}/users`); // ✅ Use API URL
  return await response.json();
});

const initialState: AdminSliceSchema = {
  platform: {
    user: {
      _add_UserForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          active: false,
          password: "",
        },
        details: [],
      },
      _edit_UserForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          active: false,
          password: "",
        },
        details: [],
      },
      _view_UserForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          active: false,
          password: "",
        },
        details: [],
      },
    },
    appointment: {
      _add_UserForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          service: "",
          date: "",
          time: "",
          message: "",
        },
        details: [],
      },
      _edit_UserForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          service: "",
          date: "",
          time: "",
          message: "",
        },
        details: [],
      },
      _view_UserForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          service: "",
          date: "",
          time: "",
          message: "",
        },
        details: [],
      },
    },
  },
  admin: {
    user: InitialServiceData,
    sidebar: InitialServiceData,
    appointment: InitialServiceData,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAddUserFormTrue: (state, action) => {
      state.admin.user.add.isFlag = action.payload;
    },
    setAddAppointmentFormTrue: (state, action) => {
      state.admin.appointment.add.isFlag = action.payload;
    },
    setOpenSidebarTrue: (state, action) => {
      state.admin.sidebar.add.isFlag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.platform.user._view_UserForm.details = action.payload;
    });
  },
});

export const {
  setAddUserFormTrue,
  setOpenSidebarTrue,
  setAddAppointmentFormTrue,
} = adminSlice.actions;
export default adminSlice.reducer;
