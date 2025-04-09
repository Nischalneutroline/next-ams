"use client";
import React, { useEffect, useState } from "react";

import Sidebar, { SideBarProps } from "./sidebar";
import MobileSidebar from "./mobilesidebar";
import { RootState, useAppSelector } from "@/state/store";

const ResponsiveSidebar = (props: SideBarProps) => {
  const { title, menus } = props;
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.sidebar.add
  );

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsMobile(window.innerWidth < 1024); // Adjust breakpoint as needed
  //   };

  //   checkScreenSize(); // Initial check
  //   window.addEventListener("resize", checkScreenSize); // Listen for changes

  //   return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
  // }, []);

  return <>{isFlag && <MobileSidebar title={title} menus={menus} />}</>;

  // isMobile ? (
  // ) : (
  //   <Sidebar title={title} menus={menus} />
  // );
};

export default ResponsiveSidebar;
