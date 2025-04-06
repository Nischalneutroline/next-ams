import React from "react";

import { DataTable } from "@/features/shared-features/table/data-table";
import { columns } from "@/features/shared-features/table/columns";
import { Data } from "@/features/shared-features/table/data";
// import { UserColumns } from "@/features/shared-features/table/columns";
// import { usersData } from "@/features/shared-features/table/data";

const TableComponent = async () => {
  return (
    <div className="w-[calc(100vw-325px)]">
      <DataTable data={Data} columns={columns} />
    </div>
  );
};

export default TableComponent;
