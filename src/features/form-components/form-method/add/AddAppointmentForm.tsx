"use client";

import {
  AdminAppointmentFormValues,
  AdminUserFormValues,
  adminAppointmentSchema,
  adminUserSchema,
} from "@/schemas/validation/validationSchema";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commonActions,
  createdByIdProps,
  customerNameProps,
  dateProps,
  emailProps,
  fullNameProps,
  isForSelfProps,
  messageProps,
  phoneProps,
  selectedDateProps,
  selectedTimeProps,
  serviceIdProps,
  statusProps,
  timeProps,
} from "@/features/shared-features/form/formporps";
import CenterSection from "@/features/shared-features/section/centersection";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import { useDispatch } from "react-redux";
import { setAddAppointmentFormTrue } from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentForm from "../../forms/admin/AppointmentForm";
import { retriveUsers } from "@/state/admin/AdminServices";
import { AdminAppointmentFormSchema } from "@/state/admin/admin";

const AddAppointmentForm = () => {
  // Redux Variable
  const dispatch = useAppDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.appointment.add
  );

  // Submit handler
  const onSubmit = (data: AdminAppointmentFormSchema) => {
    console.log("clicked");
    console.log("Form Submitted:", data);
    reset();
  };

  //  Ref for closing modal on outside click
  const formRef = useRef<HTMLDivElement>(null);

  // React-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
    control,
    trigger,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(adminAppointmentSchema),
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

  const { details } = useAppSelector(
    (state: RootState) => state.admin.admin.user.view.response
  );

  function getLabelValueArray(
    details: { id: string | number; name: string }[]
  ) {
    return details.map((user) => ({
      label: user.name,
      value: String(user.id),
    }));
  }

  const createdByOptions = getLabelValueArray(details);

  enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    COMPLETED = "COMPLETED",
    MISSED = "MISSED",
    CANCELLED = "CANCELLED",
    FOLLOW_UP = "FOLLOW_UP",
  }
  const status = [
    { label: "Scheduled", value: "SCHEDULED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Missed", value: "MISSED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Follow Up", value: "FOLLOW_UP" },
  ];

  const formObj: any = {
    customerName: {
      common: customerNameProps({}),
      ...remaining,
    },
    email: {
      common: emailProps({}),
      ...remaining,
    },
    phone: {
      common: phoneProps({}),
      ...remaining,
    },
    status: { common: statusProps({}), options: status, ...remaining },
    serviceId: {
      common: serviceIdProps({}),
      options,
      ...remaining,
    },
    selectedDate: {
      common: selectedDateProps({}),
      ...remaining,
    },
    selectedTime: { common: selectedTimeProps({}), ...remaining },
    createdById: {
      common: createdByIdProps({}),
      options: createdByOptions,
      ...remaining,
    },
    isForSelf: { common: isForSelfProps({}), ...remaining },
    message: { common: messageProps({}), ...remaining },
  };
  useEffect(() => {
    dispatch(retriveUsers());
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.querySelector(
        '.MuiPickersPopper-root, [role="dialog"]'
      );
      const clickedInsideCalendar =
        popup?.contains(event.target as Node) ?? false;
      const clickedInsideForm =
        formRef.current?.contains(event.target as Node) ?? false;

      if (!clickedInsideForm && !clickedInsideCalendar) {
        reset();
        dispatch(setAddAppointmentFormTrue(false));
      }
    };
    if (isFlag) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlag, dispatch]);
  return (
    <AnimatePresence>
      {isFlag && (
        <CenterSection>
          <motion.div
            ref={formRef}
            initial={{ y: 50, scale: 0.9 }}
            animate={{ y: 0, scale: [0.9, 1.02, 1] }}
            exit={{ y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[90%] sm:h-[80%] lg:h-[80%] lg:pb-8 w-[90%] sm:w-[75%] lg:w-[50%] bg-white rounded-2xl shadow-xl flex flex-col overflow-y-auto scrollbar"
          >
            <div className="relative h-[120px] lg:h-[140px] bg-gradient-to-b from-blue-300 to-white flex flex-col text-black justify-items-center  py-2 gap-2 px-4">
              <div className="flex md:flex-col items-center justify-center gap-2 md:gap-0 pt-3">
                <PersonAddAltIcon
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "22px",
                      lg: "24px",
                      xl: "28px",
                    },
                  }}
                />
                <div className="text-[16px] sm:text-[18px] md:text-[20px] 2xl:text-[32px] font-normal lg:font-semibold ">
                  Add New Appointment
                </div>
              </div>
              <div className="flex justify-center text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64]">
                You’re creating an account on behalf of a user. Please ensure
                accuracy. ⚠️
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => dispatch(setAddAppointmentFormTrue(false))}
              >
                <CloseIcon />
              </div>
            </div>
            <AppointmentForm formObj={formObj} form={form} />
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default AddAppointmentForm;
