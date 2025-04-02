"use client";
import Button from "@/features/shared-features/common/button";
import DaysSelection from "@/features/shared-features/form/dayinput";
import { addUserBtnProps } from "@/features/shared-features/form/formporps";

import TextInput from "@/features/shared-features/form/inputtext";
import PasswordInput from "@/features/shared-features/form/passwordinput";
import InputPhone from "@/features/shared-features/form/phoneinput";
import SelectInput from "@/features/shared-features/form/selectinput";
import SwitchInput from "@/features/shared-features/form/switchinput";
import React from "react";

const UserForm = (props: any) => {
  const { formObj, form } = props;
  console.log(formObj.isActive.form.setValue ? "Available" : "Disabled");
  const { handleSubmit, onSubmit } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-full flex flex-col gap-2 sm:gap-4"
    >
      <TextInput {...formObj.full_name} />

      <TextInput {...formObj.email} />

      <TextInput {...formObj.phone_number} />

      <SelectInput {...formObj.role} />
      <SwitchInput {...formObj.isActive} />
      <PasswordInput {...formObj.password} />

      <div className=" flex mb-4 w-full justify-center bottom-4">
        <Button {...addUserBtnProps} />
      </div>
    </form>
  );
};

export default UserForm;
