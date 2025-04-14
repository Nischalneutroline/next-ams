"use client";

import React, { useState } from "react";
import {
  addUserBtnProps,
  cancelBtnProps,
  commonActions,
  messageProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/state/store";
import { setAddNotificationFormTrue } from "@/state/admin/AdminSlice";
import Button from "@/features/shared-features/common/button";
import SelectInput from "@/features/shared-features/form/selectinput";
import { ReminderCheckboxes } from "@/features/shared-features/form/remindercheckerinput";
import TextInput from "@/features/shared-features/form/inputtext";
import { DaysSelection } from "@/features/shared-features/form/dayinput";

const CustomerInfomationForm = () => {
  const [reminderType, setReminderType] = useState("REMINDER");

  // Redux Variable
  const dispatch = useAppDispatch();

  const prepareNotification = (notification?: string[]) => {
    if (!notification || !Array.isArray(notification)) return [];
    return notification.map((method) => ({ method }));
  };

  // Submit handler
  const onSubmit = (data: any) => {
    const notification = data.notification; // Make sure this exists
    const transformedData = {
      ...data,
      type: reminderType,
      notification: prepareNotification(notification),
    };

    console.log("Transformed data:", transformedData);
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
    message: {
      common: messageProps({
        placeholder:
          "“Your appointment on {selected_appointment_date} for {selected_service_name} has been cancelled. If you’d like to reschedule, please visit your dashboard or contact us.”",
      }),
      ...remaining,
    },
    notification: {
      common: roleProps({
        input: "notification",
        label: "Send Via",
        placeholder: "",
      }),
      options: notificationOptions,
      ...remaining,
    },
    services: {
      common: roleProps({
        input: "services",
        label: "Service",
        placeholder: "Select a service associated with this reminder",
      }),
      options: notificationOptions,
      ...remaining,
    },

    title: {
      common: roleProps({
        input: "title",
        label: "Reminder Titile",
        placeholder: "Enter a Reminder Title for this Appointment",
      }),

      ...remaining,
    },
    description: {
      common: roleProps({
        input: "description",
        label: "Reminder Description",
        placeholder: "Short description about this Reminder",
        type: "textbox",
      }),

      ...remaining,
    },
    reminderOffset: {
      common: roleProps({
        input: "reminderOffset",
        label: "Reminder Offser",
        placeholder: "Enter a Reminder Title for this Appointment",
        type: reminderType,
      }),

      ...remaining,
    },
  };
  const handleCancleButton = () => {
    dispatch(setAddNotificationFormTrue(false));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-2 sm:gap-4 px-4 w-full"
    >
      <div className="flex justify-between bg-slate-200 px-2 w-full rounded-md h-[38px] items-center">
        <button
          className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
            reminderType === "REMINDER"
              ? "bg-white text-black"
              : "bg-slate-200 text-black"
          }`}
          type="button"
          onClick={() => setReminderType("REMINDER")}
        >
          Up-Coming
        </button>
        <button
          className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
            reminderType === "FOLLOW_UP"
              ? "bg-white text-black"
              : "bg-slate-200 text-black"
          }`}
          type="button"
          onClick={() => setReminderType("FOLLOW_UP")}
        >
          Follow-up
        </button>
        <button
          className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
            reminderType === "CANCELLATION"
              ? "bg-white text-black"
              : "bg-slate-200 text-black"
          }`}
          type="button"
          onClick={() => setReminderType("CANCELLATION")}
        >
          Cancellation
        </button>
        <button
          className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
            reminderType === "MISSED"
              ? "bg-white text-black"
              : "bg-slate-200 text-black"
          }`}
          type="button"
          onClick={() => setReminderType("MISSED")}
        >
          Missed
        </button>
        <button
          className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
            reminderType === "CUSTOM"
              ? "bg-white text-black"
              : "bg-slate-200 text-black"
          }`}
          type="button"
          onClick={() => setReminderType("CUSTOM")}
        >
          Custom
        </button>
      </div>
      <TextInput {...formObj.title} />
      <TextInput {...formObj.description} />
      <SelectInput {...formObj.services} />
      <DaysSelection {...formObj.notification} />
      <ReminderCheckboxes {...formObj.reminderOffset} />
      <TextInput {...formObj.message} />

      {/* <ReminderCheckboxes {...formObj.appointmnet} /> */}
      {/* <TextInput {...formObj.email} />
      <TextInput {...formObj.phone_number} />
      <div className="flex flex-col md:flex-row gap-2">
        <TextInput {...formObj.address.street} />
        <TextInput {...formObj.address.city} />
        <TextInput {...formObj.address.country} />
      </div>
      <SwitchInput {...formObj.isActive} />
      <PasswordInput {...formObj.password} /> */}
      <div className=" flex mb-4 w-full justify-center bottom-4 gap-4">
        <Button {...cancelBtnProps(handleCancleButton)} />

        <Button {...addUserBtnProps} />
        {/* <button
          className="px-4 py-2 flex gap-1 justify-center items-center  bg-gradient-to-r from-[#2B73FF] to-[#038FFF] text-white  font-[700] text-[14px] rounded-sm"
          type="submit"
        >
          Submit
        </button> */}
      </div>
    </form>
  );
};

export default CustomerInfomationForm;
