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
  phoneProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/state/store";
import { setAddNotificationFormTrue } from "@/state/admin/AdminSlice";
import Button from "@/features/shared-features/common/button";
import TextInput from "@/features/shared-features/form/inputtext";
import { DateInput } from "@/features/shared-features/form/dayinput";
import SwitchInput from "@/features/shared-features/form/switchinput";
import { DayAndTimeSelection } from "@/features/shared-features/form/dayandtimeselection";
import { formOuterDivCss } from "@/features/shared-features/form/props";

const CustomerInfomationForm = () => {
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

  const formObj: any = {
    useBusinessInfo: {
      common: emptyFormProps({
        input: "useBusinessInfo",
        placeholder: "",
        label: "Use Business Info",
        showImportant: true,
      }),
      ...remaining,
    },
    companyName: {
      common: fullNameProps({
        input: "companyName",
        label: "Company/Business Name",
        placeholder: "Enter Business Name",
      }),
      options: notificationOptions,
      ...remaining,
    },
    phoneNumber: {
      common: phoneProps({
        input: "phoneNumber",
        label: "Phone Number",

        type: "phone",
        showImportant: false,
      }),

      ...remaining,
    },
    supportEmail: {
      common: emailProps({
        input: "supportEmail",
        label: "Support Email",

        type: "email",
        showImportant: true,
      }),

      ...remaining,
    },
    physcialAddress: {
      common: cityProps({
        input: "physcialAddress",
        label: "Physical Address",
        placeholder: "Enter the Physcial Address",
        type: "text",
        showImportant: false,
      }),

      ...remaining,
    },
    mapAddress: {
      common: cityProps({
        input: "mapAddress",
        label: "Google Map",
        placeholder: "Enter the your Google Map link",
        type: "text",
        showImportant: false,
      }),

      ...remaining,
    },
    businessHours: {
      common: roleProps({
        input: "businessHours",
        label: "Business Day/Hour",
        showImportant: true,
      }),

      ...remaining,
    },
    hoildayStart: {
      common: emptyFormProps({
        input: "holidayStart",
        label: "Start",
        placeholder: "Holiday starts from",
        showImportant: true,
      }),

      ...remaining,
    },
    holidayEnd: {
      common: emptyFormProps({
        input: "holidayEnd",
        label: "End",
        placeholder: "Holiday ends at",
        showImportant: true,
      }),
      ...remaining,
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formOuterDivCss}  gap-8 lg:w-[880px]`}
    >
      <div className="flex flex-col gap-3">
        {" "}
        <div className="flex flex-col jutify-start px-2  gap-2   ">
          <h1 className="text-black font-semibold text-[18px]">
            What to Show?
          </h1>
          <p className="italic text-[12px] sm:text-[14px] text-slate-600">
            Following details will be shown to users on About and Support & Help
            section
          </p>
        </div>
        <div className="flex flex-col jutify-start px-2  ">
          <div className="flex">
            <div className="text-black font-semibold text-[18px] felex flex-row ">
              <SwitchInput {...formObj.useBusinessInfo} />
            </div>
          </div>
          <p className="italic text-[11px] sm:text-[14px] text-slate-600 px-2 flex flex-col">
            <span>
              To let users know who to reach out to for specific issues.{" "}
            </span>
            <span>
              Following details are taken from Business Settings & Business
              Details
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="col-span-1">
              <TextInput {...formObj.companyName} />
            </div>
            <div className="col-span-1">
              <TextInput {...formObj.supportEmail} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            <div className="cols-span-1">
              <TextInput {...formObj.physcialAddress} />
            </div>
            <div className="cols-span-1">
              <TextInput {...formObj.mapAddress} />
            </div>

            <TextInput {...formObj.phoneNumber} />
          </div>
          <div className="h-fit">
            <DayAndTimeSelection {...formObj.businessHours} />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-[17px] font-semibold text-black">Holiday</div>
            <div className="flex ">
              <DateInput {...formObj.hoildayStart} />
              <DateInput {...formObj.holidayEnd} />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col mb-4  justify-center gap-4">
        <Button {...addUserBtnProps} />
      </div>
    </form>
  );
};

export default CustomerInfomationForm;
