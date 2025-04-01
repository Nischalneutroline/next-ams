"use client";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarMenusProps {
  menu: string;
  icon: React.ReactNode;
  path: string;
}
export interface SideBarProps {
  title: string;
  menus: SidebarMenusProps[];
}

const MobileSidebar = (props: SideBarProps) => {
  const { title, menus } = props;
  const pathname = usePathname();
  return (
    <div className="absolute top-[12px] left-[20px] h-[calc(100vh-20px)] max-w-[60px] bg-[#FFFFFF] text-gray-600 rounded-[24px] shadow-lg px-8 py-8 flex flex-col gap-20">
      {/* <div className="text-black font-bold text-[23px] leading-[150%] ">
        {title}
      </div> */}
      <div className="flex flex-col gap-10 mt-20 items-center">
        {menus?.map((menu: SidebarMenusProps, index: number) => {
          const isActive = pathname === menu.path;
          console.log(isActive);
          console.log(pathname, menu.path);
          return (
            <nav className="flex " key={index}>
              <Link
                href={menu.path}
                className={`flex items-center gap-3 font-semibold ${
                  isActive ? "text-[#287AFF]" : " text-gray-500"
                }`}
              >
                {menu.icon}
              </Link>
            </nav>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSidebar;
