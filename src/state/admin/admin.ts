import Sidebar from "../../features/shared-features/sidebar/sidebar";
import { Appointment } from "../../features/appointment/types/types";
import { createdByIdProps } from "../../features/shared-features/form/formporps";
export type APiType = { isFlag?: boolean; response: any };
export type viewType = { view?: boolean };

export type ServiceType = {
  viewType: viewType;
  add: APiType;
  delete: APiType;
  edit: APiType;
  view: APiType;
};
// Define Form Schema
export interface AdminCustomerFormSchema {
  full_name: string;
  email: string;
  phone_number: string | number;
  role: string;
  isActive: boolean;
  password: string;
}
export interface AdminAppointmentFormSchema {
  customerName: string;
  email: string;
  phone: string;
  status: string;
  serviceId: string;
  selectedDate: string;
  selectedTime: string;
  createdById: string | number;
  isForSelf: boolean;
  message: string;
}
enum WeekDays {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

interface ServiceAvailability {
  weekDay: string;
  timeSlots?: ServiceTime[];
}

export interface ServiceTime {
  startTime: string; // Required (ISO 8601 Date string)
  endTime: string; // Required (ISO 8601 Date string)
}
export interface AdminServiceFormSchema {
  title: string;
  description: string;
  estimatedDuration: string | number;
  status: string;
  serviceAvailability: ServiceAvailability[];
}

// Define The Platform Schema for Each of the Form Driven Section of Admin
export interface CustomerPlatformSchema {
  id?: string | number | null;
  input: AdminCustomerFormSchema;
  details: AdminCustomerFormSchema[];
}

export interface ApointmentPlatformSchema {
  id?: string | number | null;
  input: AdminAppointmentFormSchema;
  details: AdminAppointmentFormSchema[];
}

export interface ServicePlatformSchema {
  id?: string | number | null;
  input: AdminServiceFormSchema;
  details: AdminServiceFormSchema[];
}

// Create the Platform Schema for Each of the form associated with CRUD
export interface CustomerPlatform {
  _add_CustomerForm: CustomerPlatformSchema;
  _edit_CustomerForm: CustomerPlatformSchema;
  _view_CustomerForm: CustomerPlatformSchema;
}

export interface AppointmentPlatform {
  _add_AppointmentForm: ApointmentPlatformSchema;
  _edit_AppointmentForm: ApointmentPlatformSchema;
  _view_AppointmentForm: ApointmentPlatformSchema;
}

export interface ServicePlatform {
  _add_ServiceForm: ServicePlatformSchema;
  _edit_ServiceForm: ServicePlatformSchema;
  _view_ServiceForm: ServicePlatformSchema;
}

export type AdminApi = {
  user: ServiceType;
  sidebar: ServiceType;
  appointment: ServiceType;
  service: ServiceType;
  notification: ServiceType;
  support: ServiceType
};

export interface AdminSliceSchema {
  platform: {
    user: CustomerPlatform;
    appointment: AppointmentPlatform;
    service: ServicePlatform;
    notification: ServicePlatform;
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
  InitialViewData = {
    view: true,
  },
  InitialServiceData = {
    viewType: InitialViewData,
    add: InitialApiData,
    delete: InitialApiData,
    edit: InitialApiData,
    view: InitialApiData,
  };
