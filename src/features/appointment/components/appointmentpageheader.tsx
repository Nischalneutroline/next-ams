"use client";
import React, { ReactEventHandler } from "react";

import Button from "@/features/shared-features/common/button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setAddAppointmentFormTrue } from "@/state/admin/AdminSlice";

const AppointmentPageHeader = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (e: ReactEventHandler) => {
    dispatch(setAddAppointmentFormTrue(true));
  };

  return (
    <div className="w-full flex justify-between lg:max-w-[calc(100vw-370px)]">
      <div className=" flex flex-col">
        <div className=" flex gap-4 items-center">
          <div className="font-semibold text-lg">Appointment</div>
          <div className="flex items-center px-2 h-[25px] bg-blue-50 text-blue-400 text-sm rounded-xl">
            Today
          </div>
        </div>
        <div className="text-[#667085] text-[13px] sm:text-sm lg:text-md tracking-wide">
          View and Manage Your Appointment here.
        </div>
      </div>
      <div className="flex gap-4">
        {/* <div className="flex gap-4 items-center">
          <div className="flex gap-2 text-sm items-center text-[#344054]">
            <DeleteOutlineIcon
              className="text-[#344054]"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "22px",
                  lg: "24px",
                  xl: "28px",
                },
              }}
            />
            <span>Delete</span>
          </div>
          <div className="flex gap-2 text-sm items-center text-[#344054]">
            <FilterListIcon
              className="text-[#344054]"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "22px",
                  lg: "24px",
                  xl: "28px",
                },
              }}
            />
            <span>Filters</span>
          </div>
        </div> */}
        <div className="flex items-center">
          <Button
            css={{
              customCss:
                "flex gap-2 justify-center items-center w-[170px] h-[38px] bg-[#0070FF] font-medium text-white text-[14px] rounded-md cursor-pointer",
            }}
            title="Add Appointment"
            icon={
              <AddIcon
                className="text-white"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    lg: "22px",
                    xl: "24px",
                  },
                }}
              />
            }
            handleAction={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPageHeader;
