"use client";
import React, { ReactEventHandler } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@/features/shared-features/common/button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setAddUserFormTrue } from "@/state/admin/AdminSlice";

const CustomerPageHeader = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (e: ReactEventHandler) => {
    dispatch(setAddUserFormTrue(true));
  };

  return (
    <div className="w-full flex justify-between">
      <div className=" flex flex-col">
        <div className=" flex gap-4 items-center">
          <div className="font-semibold text-lg">Customers</div>
          <div className="flex items-center px-2 h-[25px] bg-blue-50 text-blue-400 text-sm rounded-xl">
            Today
          </div>
        </div>
        <div className="text-[#667085] text-[13px] sm:text-sm lg:text-md tracking-wide">
          View and Manage Your Customer here.
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
            css={{}}
            title="Add Customer"
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

export default CustomerPageHeader;
