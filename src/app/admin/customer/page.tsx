import CustomerPageHeader from "@/features/customer/components/component/customerpageheader";

import { usersData } from "@/features/shared-features/table/data";
import React from "react";
import {
  UserColumns,
  columns,
} from "../../../features/shared-features/table/columns";
import { CustomerDataTable } from "@/features/shared-features/table/data-table/customerdata-table";

const page = () => {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <CustomerPageHeader />
      <CustomerDataTable data={usersData} columns={UserColumns} />
    </div>
  );
};

export default page;
