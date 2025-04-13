import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../features/reminder/types/types";
import {
  AdminSliceSchema,
  InitialServiceData,
  //   AdminCustomerFormSchema,
  //   ServiceType,
  //   APiType,
} from "./admin";
import {
  createUser,
  retriveAppointment,
  retriveService,
  retriveUsers,
  updateUser,
} from "./AdminServices";

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
          customerName: "",
          email: "",
          phone: "",
          status: "",
          serviceId: "",
          selectedDate: "",
          selectedTime: "",
          createdById: "",
          isForSelf: true,
          message: "",
        },
        details: [],
      },
      _edit_AppointmentForm: {
        id: null,
        input: {
          customerName: "",
          email: "",
          phone: "",
          status: "",
          serviceId: "",
          selectedDate: "",
          selectedTime: "",
          createdById: "",
          isForSelf: true,
          message: "",
        },
        details: [],
      },
      _view_AppointmentForm: {
        id: null,
        input: {
          customerName: "",
          email: "",
          phone: "",
          status: "",
          serviceId: "",
          selectedDate: "",
          selectedTime: "",
          createdById: "",
          isForSelf: true,
          message: "",
        },
        details: [],
      },
    },
    service: {
      _add_ServiceForm: {
        id: null,
        input: {
          title: "",
          description: "",
          estimatedDuration: "",
          status: "",
          serviceAvailability: [
            {
              weekDay: "",
              timeSlots: [
                {
                  startTime: "",
                  endTime: "",
                },
              ],
            },
          ],
        },
        details: [],
      },
      _edit_ServiceForm: {
        id: null,
        input: {
          title: "",
          description: "",
          estimatedDuration: "",
          status: "",
          serviceAvailability: [
            {
              weekDay: "",
              timeSlots: [
                {
                  startTime: "",
                  endTime: "",
                },
              ],
            },
          ],
        },
        details: [],
      },
      _view_ServiceForm: {
        id: null,
        input: {
          title: "",
          description: "",
          estimatedDuration: "",
          status: "",
          serviceAvailability: [
            {
              weekDay: "",
              timeSlots: [
                {
                  startTime: "",
                  endTime: "",
                },
              ],
            },
          ],
        },
        details: [],
      },
    },
    notification: {
      _add_ServiceForm: {
        id: null,
        input: {
          title: "",
          description: "",
          estimatedDuration: "",
          status: "",
          serviceAvailability: [
            {
              weekDay: "",
              timeSlots: [
                {
                  startTime: "",
                  endTime: "",
                },
              ],
            },
          ],
        },
        details: [],
      },
      _edit_ServiceForm: {
        id: null,
        input: {
          title: "",
          description: "",
          estimatedDuration: "",
          status: "",
          serviceAvailability: [
            {
              weekDay: "",
              timeSlots: [
                {
                  startTime: "",
                  endTime: "",
                },
              ],
            },
          ],
        },
        details: [],
      },
      _view_ServiceForm: {
        id: null,
        input: {
          title: "",
          description: "",
          estimatedDuration: "",
          status: "",
          serviceAvailability: [
            {
              weekDay: "",
              timeSlots: [
                {
                  startTime: "",
                  endTime: "",
                },
              ],
            },
          ],
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
    notification: InitialServiceData,
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
    setEditCustomerFormTrue: (state, action) => {
      state.admin.user.edit.isFlag = action.payload;
    },
    setEditCustomerId: (state, action) => {
      state.platform.user._edit_CustomerForm.id = action.payload;
    },
    setAddNotificationFormTrue: (state, action) => {
      state.admin.notification.add.isFlag = action.payload;
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
      })
      .addCase(updateUser.pending, (state) => {
        state.admin.user.edit.response.isLoading = true;
        state.admin.user.edit.response.error = null;
        state.admin.user.add.response.toastMsg = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.admin.user.edit.response.isLoading = false;
        state.admin.user.edit.response.isSuccess = true;
        state.admin.user.edit.response.details = action.payload;
        state.admin.user.add.response.toastMsg = "User updated successfully!";
        state.admin.user.edit.response.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.admin.user.edit.response.isLoading = false;
        state.admin.user.edit.response.isSuccess = false;
        state.admin.user.edit.response.toastMsg = "User update failed.";
        state.admin.user.edit.response.error = action.payload as string;
      })
      .addCase(retriveAppointment.pending, (state) => {
        state.admin.appointment.view.response.isLoading = true;
        state.admin.appointment.view.response.error = null;
        state.admin.appointment.add.response.toastMsg = "";
      })
      .addCase(
        retriveAppointment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.admin.appointment.view.response.isLoading = false;
          state.admin.user.edit.response.isSuccess = true;
          state.admin.appointment.view.response.details = action.payload; // Save the user data in the state
        }
      )
      .addCase(retriveAppointment.rejected, (state, action) => {
        state.admin.appointment.view.response.isLoading = false;
        state.admin.appointment.edit.response.isSuccess = false;
        state.admin.appointment.edit.response.toastMsg =
          "Appointment update failed.";

        state.admin.appointment.view.response.error = action.payload as string; // Capture error if failed
      })
      .addCase(retriveService.pending, (state) => {
        state.admin.service.view.response.isLoading = true;
        state.admin.service.view.response.error = null;
      })
      .addCase(
        retriveService.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.admin.service.view.response.isLoading = false;
          state.admin.service.view.response.details = action.payload; // Save the user data in the state
        }
      )
      .addCase(retriveService.rejected, (state, action) => {
        state.admin.service.view.response.isLoading = false;
        state.admin.service.view.response.error = action.payload as string; // Capture error if failed
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
  setEditCustomerId,
  setEditCustomerFormTrue,
  setAddNotificationFormTrue,
} = adminSlice.actions;
export default adminSlice.reducer;
