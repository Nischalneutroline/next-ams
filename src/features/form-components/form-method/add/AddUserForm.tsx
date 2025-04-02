"use client";

import {
  AdminUserFormValues,
  adminUserSchema,
} from "@/schemas/validation/validationSchema";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  commonActions,
  dayInputProps,
  emailProps,
  fullNameProps,
  isActiveProps,
  passwordProps,
  phoneProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import CenterSection from "@/features/shared-features/section/centersection";
import UserForm from "../../forms/admin/UserForm";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";

const AddUserForm = () => {
  // Submit handler
  const onSubmit = (data: AdminUserFormValues) => {
    console.log("Form Submitted:", data);
    reset();
  };

  // React-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
    trigger,
    control,
  } = useForm({
    resolver: zodResolver(adminUserSchema),
  });

  const form = {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    watch,
    getValues,
    control,
    trigger,
  };

  const remaining = { actions: commonActions, form, css: {} };

  const options = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Staff", value: "staff" },
  ];

  const formObj: any = {
    full_name: {
      common: fullNameProps({}),
      ...remaining,
    },
    email: {
      common: emailProps({}),
      ...remaining,
    },
    phone_number: {
      common: phoneProps({}),
      ...remaining,
    },
    role: {
      common: roleProps({}),
      options,
      ...remaining,
    },
    isActive: {
      common: isActiveProps({}),
      ...remaining,
    },
    password: { common: passwordProps({}), ...remaining },
  };
  return (
    <CenterSection>
      <div
        // p-4 sm:p-4 sm:px-6 py-4 lg:p-4 2xl:p-5
        className="h-[80%] w-[90%] sm:h-[75%] sm:w-[65%] lg:w-[35%] 
       bg-white rounded-2xl shadow-xl flex flex-col gap-4 overflow-y-auto"
      >
        <div className="bg-gradient-to-b from-blue-300 to-white flex flex-col text-black justify-center  pb-4 gap-2 ">
          <div className="flex md:flex-col items-center justify-center gap-2 md:gap-0 pt-3">
            <PersonAddAltIcon
              sx={{
                fontSize: {
                  xs: "16px",
                  sm: "18px",
                  lg: "20px",
                  xl: "25px",
                },
              }}
            />
            <div className="text-[16px] sm:text-[18px] md:text-[20px] 2xl:text-[32px]">
              New User
            </div>
          </div>
          <div className="flex justify-center text-center text-[10px] text-[#455A64]">
            You’re creating an account on behalf of a user. Please ensure
            accuracy. ⚠️
          </div>
        </div>
        <UserForm formObj={formObj} form={form} />
      </div>
    </CenterSection>
  );
};

export default AddUserForm;
