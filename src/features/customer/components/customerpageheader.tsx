"use client";
import React, { ReactEventHandler, useState } from "react";
import Button from "@/features/shared-features/common/button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setAddCustomerFormTrue } from "@/state/admin/AdminSlice";

import { RootState, useAppSelector } from "@/state/store";

import { setCustomerView } from "@/state/admin/AdminSlice";
import { IdCard, Sheet } from "lucide-react";
import { Button1 } from "@/features/shared-features/table/components/ui/button";
const CustomerPageHeader = () => {
  const [selectedView, setSelectedView] = useState<String>("");
  const dispatch = useDispatch();
  const { view } = useAppSelector(
    (state: RootState) => state.admin.admin.user?.viewType
  );

  const handleButtonClick = (e: ReactEventHandler) => {
    dispatch(setAddCustomerFormTrue(true));
  };

  return (
    <div className=" flex justify-between max-w-full lg:max-w-[calc(100vw-370px)] ">
      {/* Page Header Title */}
      <div className=" flex flex-col">
        <div className=" flex gap-4 items-center">
          <div className="font-semibold text-md lg:text-lg">Customers</div>
          <div className="flex items-center px-2 h-[18px] lg:h-[25px] bg-blue-50 text-blue-400 text-[11px] lg:text-sm rounded-xl">
            Today
          </div>
        </div>
        <div className="text-[#667085] text-[11px] lg:text-[13px] sm:text-sm lg:text-md tracking-wide">
          View and Manage Your Customer here.
        </div>
      </div>

      {/* Page Header View and Post Form*/}

      <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 justify-between items-center">
        <Button1
          className="h-[30px] w-[100px] text-[13px] flex gap-1"
          variant="outline"
          onClick={() => dispatch(setCustomerView(!view))}
        >
          {view ? (
            <Sheet className="size-3.5 lg:size-4" />
          ) : (
            <IdCard className=" size-5" />
          )}
          {view ? "Card" : "Table"} View
        </Button1>
        <div className="flex items-center">
          <Button
            css={{
              customCss:
                "flex gap-2 justify-center items-center h-[30px] w-[100px] lg:w-[170px] lg:h-[38px] bg-[#0070FF] font-medium text-white  text-[12px] lg:text-[14px] rounded-md cursor-pointer",
            }}
            title="Add User"
            icon={
              <AddIcon
                className="text-white"
                sx={{
                  fontSize: {
                    xs: "17px",
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
