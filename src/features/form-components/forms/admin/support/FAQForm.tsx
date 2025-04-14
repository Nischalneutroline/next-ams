import React, { useState } from "react";
import { Notification } from "../../../../reminder/types/types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import AddIcon from "@mui/icons-material/Add";
import Button from "@/features/shared-features/common/button";
import { addUserBtnProps } from "@/features/shared-features/form/formporps";

const FAQForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col px-4 py-4 text-black gap-4">
      <div className="flex justify-between w-full">
        <div className="flex flex-col jutify-start px-2  ">
          <h1 className="text-black font-semibold text-[18px]">
            What to Include?
          </h1>
          <p className="italic text-[12px] text-slate-600">
            Following queries will be shown to users on FAQ section
          </p>
        </div>
        <Button
          css={{
            customCss:
              "flex gap-2 justify-center items-center h-[30px] w-[100px] lg:w-[120px] sm:h-[34px] sm:w-[130px] lg:h-[38px] bg-[#0070FF] font-medium text-white  text-[12px] sm:text-[14px] lg:text-[14px] rounded-md cursor-pointer",
          }}
          title="Add FAQ"
          icon={
            <AddIcon
              className="text-white"
              sx={{
                fontSize: {
                  xs: "17px",
                  sm: "20px",
                  lg: "20px",
                  xl: "20px",
                },
              }}
            />
          }
          handleAction={setIsOpen(true)}
        />
      </div>
      <div className="flex flex-col w-full h-full px-4 gap-4">
        <div className="flex flex-col w-full px-2 sm:px-3 py-1 rounded-md">
          <div className="flex justify-between text-[15px] font-semibold">
            <div>
              FAQ 1 <span className="text-red-400">*</span>
            </div>
            <div className="flex gap-4 text-[14px] font-normal items-center">
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Edit</span>
                <AutoFixHighOutlinedIcon
                  sx={{ fontSize: 18, color: "green" }}
                />
              </div>
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Delete</span>
                <div className="flex items-center">
                  <DeleteOutlinedIcon sx={{ fontSize: 18, color: "red" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium mt-1">
            Will I receive a reminder for my appointment?
          </div>
          <div className="bg-slate-100 py-3 px-1 rounded-lg flex gap-2 text-[13px] items-center text-gray-700 mt-2">
            <span className="text-gray-700 text-sm">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            Yes, you will receive reminders via email, SMS, or push notification
            based on your system.
          </div>
        </div>

        <div className="flex flex-col w-full px-2 sm:px-3 py-1 rounded-md">
          <div className="flex justify-between text-[15px] font-semibold">
            <div>
              FAQ 1 <span className="text-red-400">*</span>
            </div>
            <div className="flex gap-4 text-[14px] font-normal items-center">
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Edit</span>
                <AutoFixHighOutlinedIcon
                  sx={{ fontSize: 18, color: "green" }}
                />
              </div>
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Delete</span>
                <div className="flex items-center">
                  <DeleteOutlinedIcon sx={{ fontSize: 18, color: "red" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium mt-1">
            Can I reschedule my appointment after booking?
          </div>
          <div className="bg-slate-100 py-3 px-1 rounded-lg flex gap-2 text-[13px] items-center text-gray-700 mt-2">
            <span className="text-gray-700 text-sm">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            Yes, you can reschedule your appointment from the dashboard at least
            24 hours in advance.
          </div>
        </div>

        <div className="flex flex-col w-full px-2 sm:px-3 py-1 rounded-md">
          <div className="flex justify-between text-[15px] font-semibold">
            <div>
              FAQ 1 <span className="text-red-400">*</span>
            </div>
            <div className="flex gap-4 text-[14px] font-normal items-center">
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Edit</span>
                <AutoFixHighOutlinedIcon
                  sx={{ fontSize: 18, color: "green" }}
                />
              </div>
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Delete</span>
                <div className="flex items-center">
                  <DeleteOutlinedIcon sx={{ fontSize: 18, color: "red" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium mt-1">
            What should I do if I miss my appointment?
          </div>
          <div className="bg-slate-100 py-3 px-1 rounded-lg flex gap-2 text-[13px] items-center text-gray-700 mt-2">
            <span className="text-gray-700 text-sm">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            If you miss your appointment, you can contact support or rebook
            through the portal, depending on the provider’s policy.
          </div>
        </div>

        <div className="flex flex-col w-full px-2 sm:px-3 py-1 rounded-md">
          <div className="flex justify-between text-[15px] font-semibold">
            <div>
              FAQ 1 <span className="text-red-400">*</span>
            </div>
            <div className="flex gap-4 text-[14px] font-normal items-center">
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Edit</span>
                <AutoFixHighOutlinedIcon
                  sx={{ fontSize: 18, color: "green" }}
                />
              </div>
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Delete</span>
                <div className="flex items-center">
                  <DeleteOutlinedIcon sx={{ fontSize: 18, color: "red" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium mt-1">
            Is my personal data safe and secure?
          </div>
          <div className="bg-slate-100 py-3 px-1 rounded-lg flex gap-2 text-[13px] items-center text-gray-700 mt-2">
            <span className="text-gray-700 text-sm">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            Yes, your data is encrypted and securely stored following
            industry-standard security protocols.
          </div>
        </div>

        <div className="flex flex-col w-full px-2 sm:px-3 py-1 rounded-md">
          <div className="flex justify-between text-[15px] font-semibold">
            <div>
              FAQ 1 <span className="text-red-400">*</span>
            </div>
            <div className="flex gap-4 text-[14px] font-normal items-center">
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Edit</span>
                <AutoFixHighOutlinedIcon
                  sx={{ fontSize: 18, color: "green" }}
                />
              </div>
              <div className="flex gap-1 text-[13px] font-normal items-center cursor-pointer">
                <span>Delete</span>
                <div className="flex items-center">
                  <DeleteOutlinedIcon sx={{ fontSize: 18, color: "red" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium mt-1">
            How can I cancel my appointment?
          </div>
          <div className="bg-slate-100 py-3 px-1 rounded-lg flex gap-2 text-[13px] items-center text-gray-700 mt-2">
            <span className="text-gray-700 text-sm">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            You can cancel your appointment directly from your dashboard or by
            contacting customer support.
          </div>
        </div>
      </div>
      <Button {...addUserBtnProps} />
    </div>
  );
};

export default FAQForm;
