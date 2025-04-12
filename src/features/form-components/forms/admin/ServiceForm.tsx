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
import {
  setAddAppointmentFormTrue,
  setAddServiceFormTrue,
} from "@/state/admin/AdminSlice";
import { DateInput, TimeInput } from "@/features/shared-features/form/dayinput";
import { useAppDispatch } from "@/state/store";
import ControllerSelectInput from "@/features/shared-features/form/selectContollerInput";
import { DayAndTimeSelection } from "@/features/shared-features/form/dayandtimeselection";
import { ServiceAvailability } from "../../../service/types/types";

const ServiceForm = (props: any) => {
  const { formObj, form } = props;

  const { handleSubmit, onSubmit } = form;

  const dispatch = useAppDispatch();

  const handleCancleButton = () => {
    dispatch(setAddServiceFormTrue(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full relative flex flex-col gap-2 sm:gap-4 px-4"
    >
      <TextInput {...formObj.title} />
      <TextInput {...formObj.description} />
      <SelectInput {...formObj.estimatedDuration} />
      <SelectInput {...formObj.status} />
      <DayAndTimeSelection {...formObj.serviceAvailability} />
      <div className="absolute left-0 bottom-4 flex w-full justify-center gap-4">
        <Button {...cancelBtnProps(handleCancleButton)} />
        <Button {...addAppointmentBtnProps(handleSubmit(onSubmit))} />
      </div>
    </form>
  );
};

export default ServiceForm;
