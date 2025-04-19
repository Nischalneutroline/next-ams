import TicketPageHeader from "@/features/customer/components/ticketpageheader";
import {
  AppointmentColumns,
  TicketsColumns,
} from "@/features/shared-features/table/columns";
import { TicketsDataTable } from "@/features/shared-features/table/data-table/ticketsdata-table";
import React from "react";

const CustomerSupportPage = () => {
  return (
    <div className="flex flex-col gap-10 w-full px-20 pt-4 ">
      <div className="w-[100%] bg-[#F4F8FF] h-[53px] flex items-center gap-8 rounded-md px-[11px]">
        <div className=" flex px-8 items-center h-[38px] font-[500] text-[14px] tracking-[-2%] spacing-[30px] rounded-md bg-[#BED3F8]">
          Today
        </div>
        <div className=" flex px-8 items-center h-[38px] font-[500] text-[14px] tracking-[-2%] spacing-[30px] rounded-md ">
          Resolved
        </div>
        <div className=" flex px-8 items-center h-[38px] font-[500] text-[14px] tracking-[-2%] spacing-[30px] rounded-md">
          Pending
        </div>
        <div className=" flex px-8 items-center h-[38px] font-[500] text-[14px] tracking-[-2%] spacing-[30px] rounded-md">
          Expired
        </div>
        <div className=" flex px-8 items-center h-[38px] font-[500] text-[14px] tracking-[-2%] spacing-[30px] rounded-md">
          All
        </div>
      </div>
      <div>
        <TicketPageHeader />
        <TicketsDataTable columns={TicketsColumns} />
      </div>
    </div>
  );
};

export default CustomerSupportPage;
