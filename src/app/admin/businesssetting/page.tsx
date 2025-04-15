"use client";

import { setAddBusinessFormTrue } from "@/state/admin/AdminSlice";
import { useAppDispatch } from "@/state/store";
import React, { useEffect } from "react";

const page = () => {
  const dispatch = useAppDispatch();

  dispatch(setAddBusinessFormTrue(true));

  return <div className="w-full flex flex-col gap-4 ">page</div>;
};

export default page;
