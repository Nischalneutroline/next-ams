import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminSliceSchema,
  InitialServiceData,
  //   AdminCustomerFormSchema,
  //   ServiceType,
  //   APiType,
} from "./admin";
import { createUser, retriveUsers } from "./AdminServices";

const API_URL = process.env.DATABASE_URL;

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${API_URL}/users`); // ✅ Use API URL
  return await response.json();
});

const initialState: AdminSliceSchema = {
  platform: {
    user: {
      _add_CustomerForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          isActive: false,
          password: "",
        },
        details: [],
      },
      _edit_CustomerForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          isActive: false,
          password: "",
        },
        details: [],
      },
      _view_CustomerForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          isActive: false,
          password: "",
        },
        details: [],
      },
    },
    appointment: {
      _add_AppointmentForm: {
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
      _edit_AppointmentForm: {
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
      _view_AppointmentForm: {
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
    service: {
      _add_ServiceForm: {
        id: null,
        input: {
          serviceName: "",
          description: "",
          duration: "",
          status: "",
          visibility: "",
          createdBy: "",
          createdAt: "",
        },
        details: [],
      },
      _edit_ServiceForm: {
        id: null,
        input: {
          serviceName: "",
          description: "",
          duration: "",
          status: "",
          visibility: "",
          createdBy: "",
          createdAt: "",
        },
        details: [],
      },
      _view_ServiceForm: {
        id: null,
        input: {
          serviceName: "",
          description: "",
          duration: "",
          status: "",
          visibility: "",
          createdBy: "",
          createdAt: "",
        },
        details: [],
      },
    },
  },
  admin: {
    user: InitialServiceData,
    sidebar: InitialServiceData,
    appointment: InitialServiceData,
    service: InitialServiceData,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAddCustomerFormTrue: (state, action) => {
      state.admin.user.add.isFlag = action.payload;
    },
    setAddAppointmentFormTrue: (state, action) => {
      state.admin.appointment.add.isFlag = action.payload;
    },
    setAddServiceFormTrue: (state, action) => {
      state.admin.service.add.isFlag = action.payload;
    },
    setOpenSidebarTrue: (state, action) => {
      state.admin.sidebar.add.isFlag = action.payload;
    },
    setCustomerView: (state, action) => {
      state.admin.user.viewType.view = action.payload;
    },
    setAppointmentView: (state, action) => {
      state.admin.appointment.viewType.view = action.payload;
    },
    setServiceView: (state, action) => {
      state.admin.service.viewType.view = action.payload;
    },
    resetUserState: (state) => {
      state.admin.user.add.response = {
        ...state.admin.user.add.response,
        isLoading: false,
        isSuccess: false,
        toastMsg: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.admin.user.add.response.isLoading = true;
        state.admin.user.add.response.isSuccess = false;
        state.admin.user.add.response.toastMsg = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.admin.user.add.response.isLoading = false;
        state.admin.user.add.response.isSuccess = true;
        state.admin.user.add.response.details = action.payload;
        state.admin.user.add.response.toastMsg = "User created successfully!";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.admin.user.add.response.isLoading = false;
        state.admin.user.add.response.isSuccess = false;
        state.admin.user.add.response.toastMsg = "User creation failed.";
        state.admin.user.add.response.error = action.payload as string;
      })
      .addCase(retriveUsers.pending, (state) => {
        state.admin.user.view.response.isLoading = true;
        state.admin.user.view.response.error = null;
      })
      .addCase(retriveUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.admin.user.view.response.isLoading = false;
        state.admin.user.view.response.details = action.payload; // Save the user data in the state
      })
      .addCase(retriveUsers.rejected, (state, action) => {
        state.admin.user.view.response.isLoading = false;
        state.admin.user.view.response.error = action.payload as string; // Capture error if failed
      });
  },
});

export const {
  setServiceView,
  setAddServiceFormTrue,
  setAppointmentView,
  setCustomerView,
  setAddCustomerFormTrue,
  setOpenSidebarTrue,
  setAddAppointmentFormTrue,
  resetUserState,
} = adminSlice.actions;
export default adminSlice.reducer;
