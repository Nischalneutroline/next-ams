"use client";

import { adminServiceSchema } from "@/schemas/validation/validationSchema";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commonActions,
  messageProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import CenterSection from "@/features/shared-features/section/centersection";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import {
  setAddCustomerFormTrue,
  setAddServiceFormTrue,
} from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";

import ServiceForm from "../../forms/admin/ServiceForm";

const AddServiceForm = () => {
  // Redux Variable
  const dispatch = useAppDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.service.add
  );
  //   const { isSuccess } = useAppSelector(
  //     (state: RootState) => state.admin.admin.user.add.response
  //   );
  // Submit handler
  const onSubmit = (data: any) => {
    const convertHHMMToISO = (time: string): string => {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(Number(hours), Number(minutes), 0, 0);
      return date.toISOString();
    };
    const transformedData = {
      ...data,
      serviceAvailability: data.serviceAvailability.map((day: any) => ({
        ...day,
        timeSlots: day.timeSlots.map((slot: any) => ({
          startTime: convertHHMMToISO(slot.startTime),
          endTime: convertHHMMToISO(slot.endTime),
        })),
      })),
    };

    // dispatch(createUser(data));
    reset();

    dispatch(setAddServiceFormTrue(false));
  };
  const generateTimeDurations = (maxMinutes = 240, step = 10) => {
    const options = [];
    for (let min = step; min <= maxMinutes; min += step) {
      const hours = Math.floor(min / 60);
      const minutes = min % 60;
      let label = "";

      if (hours > 0) {
        label = `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
      } else {
        label = `${minutes}m`;
      }

      options.push({
        value: min,
        label,
      });
    }

    return options;
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
    trigger,
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(adminServiceSchema),
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

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const formObj: any = {
    title: {
      common: roleProps({
        input: "title",
        label: "Service Title",
        type: "text",
        placeholder: "Enter Service Name",
        showImportant: true,
      }),
      ...remaining,
    },

    description: {
      common: messageProps({
        input: "description",
        label: "Description",
        type: "textbox",
        placeholder: "Short description of this service",
        showImportant: true,
      }),
      ...remaining,
    },

    // address: {
    //   street: {
    //     common: streetProps({}),
    //     ...remaining,
    //   },
    //   city: {
    //     common: cityProps({}),
    //     ...remaining,
    //   },
    //   country: {
    //     common: countryProps({}),
    //     ...remaining,
    //   },
    // },
    estimatedDuration: {
      common: roleProps({
        input: "estimatedDuration",
        label: "Estimated Duration",
        type: "select",
        placeholder: "Select Estimated Duration",
        showImportant: true,
      }),
      options: generateTimeDurations(240, 10),
      ...remaining,
    },
    status: {
      common: roleProps({
        input: "status",
        label: "Status",
        type: "select",
        placeholder: "Select a Current Service Status",
        showImportant: true,
      }),
      options: statusOptions,
      ...remaining,
    },
    serviceAvailability: {
      common: roleProps({
        input: "serviceAvailability",
        label: "Service Availability",
        placeholder: "Select a Current Service Status",
        showImportant: true,
      }),

      ...remaining,
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        reset();
        dispatch(setAddCustomerFormTrue(false));
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
  console.log(errors);

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
            className="h-[90%] sm:h-[80%] lg:h-[95%] w-[90%] sm:w-[75%] lg:w-[50%] bg-white rounded-2xl shadow-xl flex flex-col overflow-y-auto"
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
                  Add New User
                </div>
              </div>
              <div className="flex justify-center text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64]">
                You’re creating an account on behalf of a user. Please ensure
                accuracy. ⚠️
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => dispatch(setAddServiceFormTrue(false))}
              >
                <CloseIcon />
              </div>
            </div>
            <ServiceForm formObj={formObj} form={form} />
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default AddServiceForm;
