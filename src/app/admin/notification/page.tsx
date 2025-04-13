"use client";

import NotificationPageHeader from "@/features/announcement-offer/components/notificationpageheader";
import CustomerPageHeader from "@/features/customer/components/customerpageheader";
import { NotificationColumns } from "@/features/shared-features/table/columns";
import { NotificationDataTable } from "@/features/shared-features/table/data-table/notificationdata-table";
import { RootState, useAppSelector } from "@/state/store";
import React from "react";

const page = () => {
  const { view } = useAppSelector(
    (state: RootState) => state.admin.admin.user?.viewType
  );

  // console.log("Data from Api:", details);
  return (
    <div className="w-full flex flex-col gap-4 ">
      <NotificationPageHeader />

      {view ? (
        <NotificationDataTable columns={NotificationColumns} />
      ) : (
        <></>
        // <CustomerCardView user={usersData} />
      )}
    </div>
  );
};

export default page;
