import CustomerPageHeader from "@/features/customer/components/component/customerpageheader";
import TableComponent from "@/features/customer/components/component/tablecomponent";
import { usersData } from "@/features/shared-features/table/data";
import React from "react";
import {
  UserColumns,
  columns,
} from "../../../features/shared-features/table/columns";
import { DataTable } from "@/features/shared-features/table/data-table";

const page = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <CustomerPageHeader />
      <DataTable data={usersData} columns={UserColumns} />
    </div>
  );
};

export default page;
