"use client";

import {
  AdminUserFormValues,
  adminUserSchema,
} from "@/schemas/validation/validationSchema";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commonActions,
  createdByIdProps,
  customerNameProps,
  emailProps,
  isForSelfProps,
  messageProps,
  phoneProps,
  selectedDateProps,
  selectedTimeProps,
  serviceIdProps,
  statusProps,
} from "@/features/shared-features/form/formporps";
import CenterSection from "@/features/shared-features/section/centersection";
import UserForm from "../../forms/admin/UserForm";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import {
  setEditAppointmentFormTrue,
  setEditAppointmentId,
} from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  createUser,
  updateAppointment,
  updateUser,
} from "@/state/admin/AdminServices";
import { AdminCustomerFormSchema } from "@/state/admin/admin";
import { passwordProps } from "../../../shared-features/form/formporps";
import { IdCard } from "lucide-react";
import AppointmentForm from "../../forms/admin/AppointmentForm";

const EditAppointmentForm = () => {
  // Redux Variable
  const dispatch = useAppDispatch();

  const { details: userDetails } = useAppSelector(
    (state: RootState) => state.admin.admin.user.view.response
  );
  const { details: serviceDetails } = useAppSelector(
    (state: RootState) => state.admin.admin.service.view.response
  );
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.appointment.edit
  );
  const { isSuccess } = useAppSelector(
    (state: RootState) => state.admin.admin.user.add.response
  );
  const { id } = useAppSelector(
    (state: RootState) => state.admin.platform.appointment._edit_AppointmentForm
  );
  const { details } = useAppSelector(
    (state: RootState) => state.admin.admin.appointment.view.response
  );
  const dataToEdit = details?.find((u: any) => u.id === id);

  // Submit handler
  const onSubmit = (data: any, id: any) => {
    const transformedData = { ...dataToEdit, ...data };
    // dispatch(updateUser({ ...data, id: dataToEdit.id }));

    dispatch(setEditAppointmentId(""));
    dispatch(updateAppointment(transformedData, id));

    // reset();

    dispatch(setEditAppointmentFormTrue(false));
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
    // resolver: zodResolver(adminUserSchema),
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
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
    { label: "Super Admin", value: "SUPERADMIN" },
  ];

  const status = [
    { label: "Scheduled", value: "SCHEDULED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Missed", value: "MISSED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Follow Up", value: "FOLLOW_UP" },
  ];

  function getLabelValueArray(
    details: { id: string | number; name: string }[]
  ) {
    return details.map((user) => ({
      label: user.name,
      value: String(user.id),
    }));
  }

  function getServiceOptions(
    services: { id: string; title: string; status: string }[]
  ) {
    return services
      .filter((service) => service.status === "ACTIVE")
      .map((service) => ({
        label: service.title,
        value: service.id,
      }));
  }

  const createdByOptions = getLabelValueArray(userDetails);
  const serviceOptions = getServiceOptions(serviceDetails);

  const formObj: any = {
    customerName: {
      common: customerNameProps({ defaultValue: dataToEdit?.customerName }),
      ...remaining,
    },
    email: {
      common: emailProps({ defaultValue: dataToEdit?.email }),
      ...remaining,
    },
    phone: {
      common: phoneProps({ defaultValue: dataToEdit?.phone }),
      ...remaining,
    },
    status: {
      common: statusProps({ defaultValue: dataToEdit?.status }),
      options: status,
      ...remaining,
    },
    serviceId: {
      common: serviceIdProps({ defaultValue: dataToEdit?.serviceId }),
      options: serviceOptions,
      ...remaining,
    },
    selectedDate: {
      common: selectedDateProps({ defaultValue: dataToEdit?.selectedDate }),
      ...remaining,
    },
    selectedTime: {
      common: selectedTimeProps({ defaultValue: dataToEdit?.selectedTime }),
      ...remaining,
    },
    createdById: {
      common: createdByIdProps({ defaultValue: dataToEdit?.createdById }),
      options: createdByOptions,
      ...remaining,
    },
    isForSelf: {
      common: isForSelfProps({ defaultValue: dataToEdit?.isForSelf }),
      ...remaining,
    },
    message: {
      common: messageProps({ defaultValue: dataToEdit?.message }),
      ...remaining,
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        reset();
        dispatch(setEditAppointmentFormTrue(false));
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
                  Edit User Details
                </div>
              </div>
              <div className="flex justify-center text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64]">
                You’re editing an account details on behalf of a user. Please
                ensure accuracy. ⚠️
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => {
                  dispatch(setEditAppointmentFormTrue(false));
                  dispatch(setEditAppointmentId(""));
                }}
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

export default EditAppointmentForm;
