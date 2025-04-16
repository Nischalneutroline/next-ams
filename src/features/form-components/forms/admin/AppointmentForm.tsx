"use client";
import Button from "@/features/shared-features/common/button";
import {
  addAppointmentBtnProps,
  addUserBtnProps,
} from "@/features/shared-features/form/formporps";
import TextInput from "@/features/shared-features/form/inputtext";
import SelectInput from "@/features/shared-features/form/selectinput";
import SwitchInput from "@/features/shared-features/form/switchinput";
import React from "react";
import { cancelBtnProps } from "../../../shared-features/form/formporps";
import { setAddAppointmentFormTrue } from "@/state/admin/AdminSlice";
import { DateInput, TimeInput } from "@/features/shared-features/form/dayinput";
import { useAppDispatch } from "@/state/store";
import ControllerSelectInput from "@/features/shared-features/form/selectContollerInput";

const AppointmentForm = (props: any) => {
  const { formObj, form } = props;

  const { handleSubmit, onSubmit } = form;

  const dispatch = useAppDispatch();

  const handleCancleButton = () => {
    dispatch(setAddAppointmentFormTrue(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-2 sm:gap-4 px-4"
    >
      <TextInput {...formObj.customerName} />
      <TextInput {...formObj.email} />
      <TextInput {...formObj.phone} />
      <SelectInput {...formObj.createdById} />
      <SwitchInput {...formObj.isForSelf} />
      <div className="flex justify-between items-center">
        <SelectInput {...formObj.serviceId} />
        <SelectInput {...formObj.status} />
      </div>
      <div className="flex justify-between items-center">
        <DateInput {...formObj.selectedDate} />
        <TimeInput {...formObj.selectedTime} />
      </div>
      <TextInput {...formObj.message} />
      <div className=" flex mb-4 w-full justify-center bottom-4 gap-4">
        <Button {...cancelBtnProps(handleCancleButton)} />
        <Button {...addAppointmentBtnProps()} />
      </div>
    </form>
  );
};

export default AppointmentForm;
