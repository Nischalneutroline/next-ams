import Sidebar from "../../features/shared-features/sidebar/sidebar";
import { Appointment } from "../../features/appointment/types/types";
export type APiType = { isFlag?: boolean; response: any };
export type ServiceType = {
  add: APiType;
  delete: APiType;
  edit: APiType;
  view: APiType;
};
// Define Form Schema
export interface AdminUserFormSchema {
  full_name: string;
  email: string;
  phone_number: string | number;
  role: string;
  active: boolean;
  password: string;
}
export interface AdminAppointmentFormSchema {
  full_name: string;
  email: string;
  phone_number: string | number;
  service: string;
  date: string | number;
  time: string;
  message: string;
}
// Define The Platform Schema for Each of the Form Driven Section of Admin
export interface UserPlatformSchema {
  id?: string | number | null;
  input: AdminUserFormSchema;
  details: AdminUserFormSchema[];
}

export interface ApointmentPlatformSchema {
  id?: string | number | null;
  input: AdminAppointmentFormSchema;
  details: AdminAppointmentFormSchema[];
}

// Create the Platform Schema for Each of the form associated with CRUD
export interface UserPlatform {
  _add_UserForm: UserPlatformSchema;
  _edit_UserForm: UserPlatformSchema;
  _view_UserForm: UserPlatformSchema;
}

export interface AppointmentPlatform {
  _add_UserForm: ApointmentPlatformSchema;
  _edit_UserForm: ApointmentPlatformSchema;
  _view_UserForm: ApointmentPlatformSchema;
}

export type AdminApi = {
  user: ServiceType;
  sidebar: ServiceType;
  appointment: ServiceType;
};

export interface AdminSliceSchema {
  platform: {
    user: UserPlatform;
    appointment: AppointmentPlatform;
  };
  admin: AdminApi;
}

export const InitialApiData = {
    isFlag: false,
    response: {
      details: [],
      error: "",
      isLoading: false,
      isSuccess: false,
      toastMsg: "",
    },
  },
  InitialServiceData = {
    add: InitialApiData,
    delete: InitialApiData,
    edit: InitialApiData,
    view: InitialApiData,
  };
