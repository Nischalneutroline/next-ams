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
import { CheckboxInput } from "@/features/shared-features/form/checkboxinput";
import { CheckboxWithSchedule } from "@/features/shared-features/form/checkboxwithschedule";
import { XIcon } from "lucide-react";

const AnnouncementForm = () => {
  const [reminderType, setReminderType] = useState("REMINDER");

  // Redux Variable
  const dispatch = useAppDispatch();

  const prepareNotification = (notification?: string[]) => {
    if (!notification || !Array.isArray(notification)) return [];
    return notification.map((method) => ({ method }));
  };

  // Submit handler
  const onSubmit = (data: any) => {
    const scheduledTime = data.scheduledTime || {};

    const expiryReminder = data.expiryReminder?.[0]?.method || "THIRTY_DAYS";
    const showOn = data.showOn?.[0]?.method || "BANNER";
    const hasDate = scheduledTime?.date;
    const hasTime = scheduledTime?.time;

    let scheduledAt: string | null = null;

    const isValidDate = (val: any) =>
      typeof val === "string" && val.trim().length > 0;
    const isValidTime = (val: any) =>
      typeof val === "string" && val.trim().length > 0;

    const isImmediate = !(isValidDate(hasDate) && isValidTime(hasTime));

    if (!isImmediate) {
      const isoString = new Date(`${hasDate}T${hasTime}`);
      if (!isNaN(isoString.getTime())) {
        scheduledAt = isoString.toISOString();
      } else {
        console.error("Invalid date/time:", hasDate, hasTime);
      }
    }

    const transformedData = {
      title: data.title,
      description: data.description || "",
      message: data.message || "",
      audience: data.targetAudience || "ALL",
      isImmediate,
      scheduledAt,
      showOn,
      expiredAt: expiryReminder,
      type: reminderType,
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

  const targetAudienceOptions = [
    { label: "Appointments Users", value: "APPOINTMENT_USERS" },
    { label: "Cancelled Users", value: "CANCELLED_USERS" },
    { label: "All", value: "ALL" },
  ];
  const announcemnetOptions = [
    { label: "Immediately", value: "Immediately", showSchedule: false },
    { label: "Schedule", value: "schedule", showSchedule: true },
  ];

  const showOnOptions = [
    { label: "Top Banner", value: "TOP_BANNER", showSchedule: false },
    {
      label: "Push Notification",
      value: "PUSH_NOTIFICATION",
      showSchedule: false,
    },
    {
      label: "Email",
      value: "Email",
      showSchedule: false,
    },
    {
      label: "All",
      value: "ALL",
      showSchedule: false,
    },
  ];
  const expiryReminderOptions = [
    { label: "1 days", value: "1", showSchedule: false },
    {
      label: "3 days",
      value: "3",
      showSchedule: false,
    },
    {
      label: "7 days",
      value: "7",
      showSchedule: false,
    },
    {
      label: "30 days",
      value: "30",
      showSchedule: false,
    },
    {
      label: "Never",
      value: "never",
      showSchedule: false,
    },
  ];
  const formObj: any = {
    message: {
      common: messageProps({
        placeholder:
          "“Your appointment on {selected_appointment_date} for {selected_service_name} has been cancelled. If you’d like to reschedule, please visit your dashboard or contact us.”",
      }),
      ...remaining,
    },
    customer: {
      common: roleProps({
        input: "customer",
        label: "Select Customer",
        placeholder: "Select Customer",
      }),
      options: targetAudienceOptions,

      ...remaining,
    },
    host: {
      common: roleProps({
        input: "host",
        label: "Select Host",
        placeholder: "Select Host",
      }),
      options: targetAudienceOptions,

      ...remaining,
    },
    targetAudience: {
      common: roleProps({
        input: "targetAudience",
        label: "Target Audience",
        placeholder: "Select a service associated with this reminder",
      }),
      options: targetAudienceOptions,
      ...remaining,
    },
    announcement: {
      common: roleProps({
        input: "announcement",
        label: "Schedule Announcement",
        placeholder: "",
      }),
      options: announcemnetOptions,
      ...remaining,
    },
    showOn: {
      common: roleProps({
        input: "showOn",
        label: "Show On",
        placeholder: "",
      }),
      options: showOnOptions,
      ...remaining,
    },
    expiryReminder: {
      common: roleProps({
        input: "expiryReminder",
        label: "Expiry Reminder",
        placeholder: "",
      }),
      options: expiryReminderOptions,
      ...remaining,
    },

    title: {
      common: roleProps({
        input: "title",
        label: "Announcement Titile",
        placeholder: "Enter a Announcement Title for this Appointment",
      }),

      ...remaining,
    },
    description: {
      common: roleProps({
        input: "description",
        label: "Announcement Description",
        placeholder: "Short description about this Reminder",
        type: "textbox",
      }),

      ...remaining,
    },
    reminderOffset: {
      common: roleProps({
        input: "reminderOffset",
        label: "Announcement Offset",
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
      <CheckboxInput {...formObj.targetAudience} selectionType="single" />

      <div className="grid grid-cols-2">
        <div className="cols-span-1">
          <SelectInput {...formObj.customer} />
        </div>

        <div className="cols-span-1">
          <SelectInput {...formObj.host} />
        </div>
      </div>
      <CheckboxWithSchedule {...formObj.announcement} selectionType="single" />
      <CheckboxWithSchedule {...formObj.showOn} />
      <CheckboxWithSchedule
        {...formObj.expiryReminder}
        selectionType="single"
      />

      {/* <DaysSelection {...formObj.notification} /> */}
      {/* <ReminderCheckboxes {...formObj.reminderOffset} /> */}
      {/* <TextInput {...formObj.message} /> */}

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

export default AnnouncementForm;
