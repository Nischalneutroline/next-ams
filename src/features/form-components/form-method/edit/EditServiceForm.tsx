"use client";

import {
  AdminUserFormValues,
  adminEditUserSchema,
  adminServiceSchema,
  adminUserSchema,
} from "@/schemas/validation/validationSchema";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cityProps,
  commonActions,
  countryProps,
  emailProps,
  emptyFormProps,
  fullNameProps,
  isActiveProps,
  messageProps,
  phoneProps,
  roleProps,
  streetProps,
  zipCodeProps,
} from "@/features/shared-features/form/formporps";
import CenterSection from "@/features/shared-features/section/centersection";
import UserForm from "../../forms/admin/UserForm";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import {
  setAddCustomerFormTrue,
  setAddServiceFormTrue,
  setEditCustomerFormTrue,
  setEditServiceFormTrue,
} from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  createUser,
  updateService,
  updateUser,
} from "@/state/admin/AdminServices";
import { AdminCustomerFormSchema } from "@/state/admin/admin";
import { passwordProps } from "../../../shared-features/form/formporps";
import { IdCard } from "lucide-react";
import ServiceForm from "../../forms/admin/ServiceForm";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  formContainerCss,
  formSubTitleCss,
  formTitleCss,
  formTitleDivCss,
} from "@/features/shared-features/form/props";

const EditServiceForm = () => {
  // Redux Variable
  const dispatch = useAppDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.service.edit
  );
  const { isSuccess } = useAppSelector(
    (state: RootState) => state.admin.admin.service.add.response
  );
  const { id: serviceId } = useAppSelector(
    (state: RootState) => state.admin.platform.service._edit_ServiceForm
  );

  const { details } = useAppSelector(
    (state: RootState) => state.admin.admin.service.view.response
  );
  const dataToEdit = details?.find((u: any) => u.id === serviceId);

  // Submit handler
  const onSubmit = (data: any) => {
    console.log(data, "on submit");

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const parsedData = {
      id: serviceId,
      title: data.title,
      description: data.description,
      estimatedDuration: Number(data.estimatedDuration),
      status: data?.availabilities ? "ACTIVE" : "INACTIVE",
      businessDetailId: data.businessDetailId ?? "cm9gvwy4s0003vdg0f24wf178",

      serviceHourDay: data.serviceHourDay?.map((day: any) => ({
        weekDay: day.weekDay,
        timeSlots: day.timeSlots?.map((slot: any) => ({
          id: slot.id, // Include if editing existing slot
          startTime: `${today}T${slot.startTime}:00`,
          endTime: `${today}T${slot.endTime}:00`,
        })),
      })),

      serviceAvailability: data.serviceAvailability ?? [],

      coverPhoto: data.coverPhoto?.[0]
        ? {
            name: data.coverPhoto[0].name,
            size: data.coverPhoto[0].size,
            type: data.coverPhoto[0].type,
            lastModified: data.coverPhoto[0].lastModified,
          }
        : null,
    };

    console.log(parsedData, "parsedData to send");

    dispatch(updateService(parsedData));
    reset();
    dispatch(setEditServiceFormTrue(false));
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
    // resolver: zodResolver(adminServiceSchema),
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
  const options = [
    { label: "Mon", value: "MONDAY" },
    { label: "Tue", value: "TUESDAY" },
    { label: "Wed", value: "WEDNESDAY" },
    { label: "Thu", value: "THURSDAY" },
    { label: "Fri", value: "FRIDAY" },
    { label: "Sat", value: "SATURDAY" },
    { label: "Sun", value: "SUNDAY" },
  ];

  const formObj: any = {
    title: {
      common: roleProps({
        input: "title",
        label: "Service Title",
        defaultValue: dataToEdit?.title,
        placeholder: "Enter Service Name",
        showImportant: true,
      }),
      ...remaining,
    },
    coverPhoto: {
      common: roleProps({
        input: "coverPhoto",
        label: "Cover Photo",
        type: "file",
        placeholder: "Upload a service picture",
        showImportant: true,
      }),
      ...remaining,
    },

    description: {
      common: messageProps({
        input: "description",
        label: "Description",
        type: "textbox",
        defaultValue: dataToEdit?.description,
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
        label: " Duration",

        placeholder: "Select Estimated Duration",
        showImportant: true,
      }),
      options: generateTimeDurations(240, 10),
      ...remaining,
      css: {
        divCss:
          "relative pt-2 flex flex-col sm:flex-row gap-4 text-sm text-gray-800 w-full max-w-full px-2 sm:px-3 lg:px-4 sm:h-[50px] items-start sm:items-center pb-3",
        labelCss:
          "font-medium flex items-center gap-2 text-sm sm:text-[15px] lg:text-[15px] text-[#1F2937] tracking-wide",
      },
    },
    status: {
      common: roleProps({
        input: "status",
        label: "Status",

        placeholder: "Select a Current Service Status",
        showImportant: true,
      }),
      options: statusOptions,
      ...remaining,
    },
    serviceAvailability: {
      common: roleProps({
        input: "serviceAvailability",
        label: "Service Days",
        placeholder: "Select a Current Service Status",
        showImportant: true,
        defaultValue: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        disabledValue: ["SATURDAY", "SUNDAY"],
      }),
      options,
      ...remaining,
    },
    serviceHourDay: {
      common: roleProps({
        input: "serviceHourDay",
        label: "Service Hour / Day",
        showImportant: true,
      }),
      options,
      ...remaining,
      css: { divCss: "min-h-[150px] gap-y-4" },
    },
    availabilities: {
      common: emptyFormProps({
        input: "availabilities",
        label: "Avaiability",
        showImportant: true,
        defaultValue: dataToEdit?.status === "ACTIVE" ? true : false,
        icon: (
          <PersonSearchIcon
            className="text-[#6C757D]"
            sx={{
              fontSize: {
                xs: "16px",
                sm: "16px",
                lg: "16px",
              },
            }}
          />
        ),
      }),
      ...remaining,
      css: {
        divCss:
          "relative pt-2 flex flex-col sm:flex-row  gap-2 text-sm text-gray-800 w-full max-w-full px-2 sm:px-3 lg:px-4  h-[80px] items-start sm:items-center",
      },
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        reset();
        dispatch(setEditCustomerFormTrue(false));
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
            className={formContainerCss}
          >
            <div className={formTitleDivCss}>
              <div className={formTitleCss}>Edit Service Details</div>
              <div className={formSubTitleCss}>
                Manage and Cusotmize your offered services.
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => dispatch(setEditServiceFormTrue(false))}
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

export default EditServiceForm;
