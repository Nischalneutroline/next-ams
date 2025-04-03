import CustomerPageHeader from "@/features/customer/components/component/customerpageheader";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col p-1">
      <CustomerPageHeader />
      <div>Table</div>
    </div>
  );
};

export default page;
