"use client";

import { adminAppointmentSchema } from "@/schemas/validation/validationSchema";
import React, { useEffect, useRef, useState } from "react";
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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import {
  setAddAppointmentFormTrue,
  setAddNotificationFormTrue,
} from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentForm from "../../forms/admin/AppointmentForm";
import { retriveUsers } from "@/state/admin/AdminServices";
import { AdminAppointmentFormSchema } from "@/state/admin/admin";
import NotificationForm from "../../forms/admin/NotificationForm";
import AnnouncementForm from "../../forms/admin/AnnouncementForm";
import { Notification } from "../../../reminder/types/types";
import Button from "@/features/shared-features/common/button";

const AddNotificationForm = () => {
  // Redux Variable
  const dispatch = useAppDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.notification.add
  );

  const [notificationType, setNotificationType] = useState("Reminder");

  //  Ref for closing modal on outside click
  const formRef = useRef<HTMLDivElement>(null);

  const options = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Staff", value: "staff" },
  ];

  const { details } = useAppSelector(
    (state: RootState) => state.admin.admin.notification.view.response
  );

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
        dispatch(setAddNotificationFormTrue(false));
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
  }, [isFlag]);
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
                  Add New Notification
                </div>
              </div>
              <div className="flex justify-center text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64]">
                You’re creating an{" "}
                {notificationType === "Reminder" ? "reminder" : "appointment"}{" "}
                on behalf of a company. Please ensure accuracy. ⚠️
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => dispatch(setAddAppointmentFormTrue(false))}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="flex w-full justify-start gap-2 px-6">
              <Button
                css={{
                  customCss: `flex gap-2 justify-center items-center h-[30px] w-[100px] lg:w-[170px] sm:h-[34px] sm:w-[130px] lg:h-[38px] font-medium   text-[12px] sm:text-[14px] lg:text-[16px] rounded-md cursor-pointer ${
                    notificationType === "Reminder"
                      ? " bg-[#0070FF] text-white"
                      : "bg-gray-100 border-[1px] border-gray-300 text-black/60 hover:bg-gray-200"
                  }`,
                }}
                title="Reminder"
                handleAction={() => setNotificationType("Reminder")}
              />
              <Button
                css={{
                  customCss: `flex gap-2 justify-center items-center h-[30px] w-[100px] lg:w-[170px] sm:h-[34px] sm:w-[130px] lg:h-[38px] font-medium   text-[12px] sm:text-[14px] lg:text-[16px] rounded-md cursor-pointer ${
                    notificationType === "Announcement"
                      ? " bg-[#0070FF] text-white"
                      : "bg-gray-100 border-[1px] border-gray-300 text-black/60 hover:bg-gray-200"
                  }`,
                }}
                title="Announcement"
                handleAction={() => setNotificationType("Announcement")}
              />
            </div>

            <div className="py-4 w-full">
              {notificationType === "Reminder" && <NotificationForm />}
              {notificationType === "Announcement" && <AnnouncementForm />}
            </div>
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default AddNotificationForm;
