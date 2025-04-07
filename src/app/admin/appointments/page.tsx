import AppointmentPageHeader from "@/features/appointment/components/appointmentpageheader";
import { columns } from "@/features/shared-features/table/columns";
import { Data } from "@/features/shared-features/table/data";
import { AppointmentDataTable } from "@/features/shared-features/table/data-table/appointmentdata-table";

import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <AppointmentPageHeader />
      <AppointmentDataTable data={Data} columns={columns} />
    </div>
  );
};

export default page;
