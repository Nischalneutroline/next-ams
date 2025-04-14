"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CenterSection from "@/features/shared-features/section/centersection";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import {
  setAddAppointmentFormTrue,
  setAddNotificationFormTrue,
} from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";
import { retriveUsers } from "@/state/admin/AdminServices";
import AnnouncementForm from "../../forms/admin/notification/AnnouncementForm";
import Button from "@/features/shared-features/common/button";
import ReminderForm from "../../forms/admin/notification/NotificationForm";
import CustomerInfomationForm from "../../forms/admin/support/CustomerInformation";
import FAQForm from "../../forms/admin/support/FAQForm";
import AdminSupportForm from "../../forms/admin/support/AdminSupportForm";
import CustomerSupportPage from "../../forms/admin/support/CustomerSupportForm";
import AddFAQ from "../../forms/admin/support/AddFAQ";

const AddSupportAndFaq = () => {
  const [supportType, setSupportType] = useState("Customer Information");
  // Redux Variable
  const dispatch = useAppDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.support.add
  );

  const isOpen = true;
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
                  Support and Help
                </div>
              </div>
              <div className="flex justify-center text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64]">
                Manage and send system notification to suers and staff.
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => dispatch(setAddAppointmentFormTrue(false))}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="flex px-4">
              {" "}
              <div className="flex justify-between bg-[#287AFF] px-4 w-full rounded-md h-[38px] items-center ">
                <button
                  className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[180px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[13px] rounded-md cursor-pointer ${
                    supportType === "Customer Information"
                      ? "bg-white text-black"
                      : "bg-[#287AFF] text-white"
                  }`}
                  type="button"
                  onClick={() => setSupportType("Customer Information")}
                >
                  Customer Information
                </button>
                <button
                  className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[13px] rounded-md cursor-pointer ${
                    supportType === "Frequenlty Asked Questions (FAQs)"
                      ? "bg-white text-black"
                      : "bg-[#287AFF] text-white"
                  }`}
                  type="button"
                  onClick={() =>
                    setSupportType("Frequenlty Asked Questions (FAQs)")
                  }
                >
                  FAQs
                </button>
                <button
                  className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[160px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[13px] rounded-md cursor-pointer ${
                    supportType === "Customer Support"
                      ? "bg-white text-black"
                      : "bg-[#287AFF] text-white"
                  }`}
                  type="button"
                  onClick={() => setSupportType("Customer Support")}
                >
                  Customer Support
                </button>
                <button
                  className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[160px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[13px] rounded-md cursor-pointer ${
                    supportType === "Admin Support"
                      ? "bg-white text-black"
                      : "bg-[#287AFF] text-white"
                  }`}
                  type="button"
                  onClick={() => setSupportType("Admin Support")}
                >
                  Admin Support
                </button>
              </div>
            </div>
            <div className="py-4 w-full">
              {supportType === "Customer Information" && (
                <CustomerInfomationForm />
              )}
              {/* {supportType === "Frequenlty Asked Questions (FAQs)" && (
                <FAQForm/>
              )} */}
              {supportType === "Customer Support" && <CustomerSupportPage />}
              {supportType === "Admin Support" && <AdminSupportForm />}
            </div>
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default AddSupportAndFaq;
