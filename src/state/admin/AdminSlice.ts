import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminSliceSchema,
  InitialServiceData,
//   AdminUserFormSchema,
//   ServiceType,
//   APiType,
} from "./admin";

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
  },
  admin: {
    user: InitialServiceData,
    sidebar: InitialServiceData,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAddUserFormTrue: (state, action) => {
      state.admin.user.add.isFlag = action.payload;
    },
    setOpenSidebarTrue: (state, action) => {
      state.admin.sidebar.add.isFlag = action.payload;
    },
  },
});

export const { setAddUserFormTrue, setOpenSidebarTrue } = adminSlice.actions;
export default adminSlice.reducer;
