import Sidebar from "../../features/shared-features/sidebar/sidebar";
export type APiType = { isFlag?: boolean; response: any };
export type ServiceType = {
  add: APiType;
  delete: APiType;
  edit: APiType;
  view: APiType;
};

export interface AdminUserFormSchema {
  full_name: string;
  email: string;
  phone_number: string | number;
  role: string;
  active: boolean;
  password: string;
}
export interface UserPlatformSchema {
  id?: string | number | null;
  input: AdminUserFormSchema;
  details: AdminUserFormSchema[];
}

export interface UserPlatform {
  _add_UserForm: UserPlatformSchema;
  _edit_UserForm: UserPlatformSchema;
  _view_UserForm: UserPlatformSchema;
}

export type AdminApi = {
  user: ServiceType;
  sidebar: ServiceType;
};

export interface AdminSliceSchema {
  platform: {
    user: UserPlatform;
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
