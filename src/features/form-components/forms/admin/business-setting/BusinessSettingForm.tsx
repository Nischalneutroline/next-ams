"use client";

import React, { useState } from "react";
import {
  addUserBtnProps,
  cancelBtnProps,
  cityProps,
  commonActions,
  emailProps,
  emptyFormProps,
  fullNameProps,
  messageProps,
  phoneProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/state/store";
import { setAddNotificationFormTrue } from "@/state/admin/AdminSlice";
import Button from "@/features/shared-features/common/button";
import SelectInput from "@/features/shared-features/form/selectinput";
import { ReminderCheckboxes } from "@/features/shared-features/form/remindercheckerinput";
import TextInput from "@/features/shared-features/form/inputtext";
import {
  DateInput,
  DaysSelection,
  TimeInput,
} from "@/features/shared-features/form/dayinput";
import SwitchInput from "@/features/shared-features/form/switchinput";
import { DayAndTimeSelection } from "@/features/shared-features/form/dayandtimeselection";

const BusinessSettingForm = () => {
  const [reminderType, setReminderType] = useState("REMINDER");

  // Redux Variable
  const dispatch = useAppDispatch();

  // Submit handler
  const onSubmit = (data: any) => {
    console.log("Transformed data:", data);
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
  } = useForm({});

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

  const notificationOptions = [
    { label: "Push Notification", value: "Push Notification" },
    { label: "Email", value: "Email" },
    { label: "SMS", value: "SMS" },
  ];

  const priorityLevelOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Urgent", value: "URGENT" },
  ];
  const formObj: any = {
    businessName: {
      common: emptyFormProps({
        input: "businessName",
        placeholder: "Enter Your Business Name",
        label: "Business Name",
        showImportant: true,
      }),
      ...remaining,
    },
    category: {
      common: fullNameProps({
        input: "category",
        label: "Company/Industry ",
        placeholder: "Select Industry",
        showImportant: true,
        type: "select",
      }),
      options: notificationOptions,
      ...remaining,
    },
    phoneNumber: {
      common: phoneProps({
        input: "phoneNumber",
        label: "Phone Number",
        placeholder: "Enter your number",
        type: "phone",
        showImportant: true,
      }),

      ...remaining,
    },
    email: {
      common: emailProps({
        input: "email",
        label: "Email",
        placeholder: "Enter your Email Address",
        type: "email",
        showImportant: true,
      }),

      ...remaining,
    },
    website: {
      common: cityProps({
        input: "website",
        label: "Website",
        placeholder: "Your Business Website URL",
        type: "website",
        showImportant: true,
      }),

      ...remaining,
    },
    country: {
      common: cityProps({
        input: "country",
        label: "Country",
        placeholder: "Enter your Country name",
        type: "text",
        showImportant: true,
      }),

      ...remaining,
    },

    state: {
      common: cityProps({
        input: "state",
        label: "State",
        placeholder: "Enter your State name",
        type: "text",
        showImportant: true,
      }),

      ...remaining,
    },
    street: {
      common: roleProps({
        input: "street",
        label: "Street",
        placeholder: "Enter your Street Name",
        type: "text",
        showImportant: true,
      }),

      ...remaining,
    },
    city: {
      common: roleProps({
        input: "city",
        label: "City ",
        placeholder: "Enter your City Name",
        type: "text",
        showImportant: true,
      }),

      ...remaining,
    },
    zipCode: {
      common: roleProps({
        input: "zipCode",
        label: "Zip Code",
        placeholder: "Enter your Zip Code",
        type: "text",
        showImportant: true,
      }),

      ...remaining,
    },
    googleMap: {
      common: emptyFormProps({
        input: "googleMap",
        label: "Google Map",
        placeholder: "Upload Your Map",
        showImportant: true,
        type: "text",
      }),

      ...remaining,
    },
    registrationNumber: {
      common: emptyFormProps({
        input: "registrationNumber",
        label: "Business Registration Number",
        placeholder: "Enter Business Registration Number",
        showImportant: true,
      }),
      ...remaining,
    },
    tax_eid_pin: {
      common: emptyFormProps({
        input: "tax_eid_pin",
        label: "Tax ID / EIN / PAN",
        placeholder: "Enter your Tax ID / EIN / PAN document",
        showImportant: true,
      }),
      ...remaining,
    },
    businessLogo: {
      common: emptyFormProps({
        input: "businessLogo",
        label: "Business Image / Logo",
        placeholder: "Upload your business image or logo",
        showImportant: true,
      }),
      ...remaining,
    },
    visibility: {
      common: emptyFormProps({
        input: "visibility",
        label: "Visibility",
        placeholder: "Select Visibility",
        showImportant: true,
      }),
      options: priorityLevelOptions,
      ...remaining,
    },
  };
  const handleCancleButton = () => {
    dispatch(setAddNotificationFormTrue(false));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-2 sm:gap-4 px-4 w-full gap-4"
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.businessName} />
          </div>
          <div className="col-span-1">
            <SelectInput {...formObj.category} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.email} />
          </div>
          <div className="col-span-1">
            <TextInput {...formObj.phoneNumber} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.website} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.country} />
          </div>
          <div className="col-span-1">
            <TextInput {...formObj.state} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.street} />
          </div>
          <div className="col-span-1">
            <TextInput {...formObj.city} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.zipCode} />
          </div>
          <div className="col-span-1">
            <TextInput {...formObj.googleMap} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.registrationNumber} />
          </div>
          <div className="col-span-1">
            <TextInput {...formObj.tax_eid_pin} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <TextInput {...formObj.businessLogo} />
          </div>
          <div className="col-span-1">
            <SelectInput {...formObj.visibility} />
          </div>
        </div>
      </div>

      <div className=" flex mb-4 w-full justify-center gap-4">
        <Button {...cancelBtnProps(handleCancleButton)} />

        <Button {...addUserBtnProps} />
      </div>
    </form>
  );
};

export default BusinessSettingForm;
