import { columns } from "@/features/shared-features/table/columns";
import { Data } from "@/features/shared-features/table/data";
import { DataTable } from "@/features/shared-features/table/data-table";
import React from "react";

const page = () => {
  return (
    <div>
      <DataTable data={Data} columns={columns} />
    </div>
  );
};

export default page;
