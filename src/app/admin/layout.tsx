"use client";
import { useState } from "react";
import Header from "./component/header";
import Sidebar, { SideBarProps } from "./component/sidebar";
import HomeIcon from "@mui/icons-material/Home";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  ExitToApp,
  HelpOutline,
  PersonOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import MobileSidebar from "./component/mobileSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const onToggleMenu = () => {
    console.log("seen toggle menu");
    setOpenSidebar(true);
  };
  const sidebarData: SideBarProps = {
    title: "Customer Name ",
    menus: [
      {
        menu: "Dashboard",
        icon: <HomeRoundedIcon sx={{ fontSize: 28 }} />,
        path: "/admin",
      },
      {
        menu: "Appointments",
        icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 25 }} />,
        path: "/admin/appointments",
      },
      {
        menu: "Customer",
        icon: <GroupIcon sx={{ fontSize: 25 }} />,
        path: "/admin/customer",
      },
      {
        menu: "Availability and Scheduling",
        icon: <PendingActionsIcon sx={{ fontSize: 25 }} />,
        path: "/admin/scheduling",
      },
      {
        menu: "Serivces",
        icon: <DesignServicesIcon sx={{ fontSize: 25 }} />,
        path: "/admin/services",
      },
      {
        menu: "Buisness Setting",
        icon: <SettingsIcon sx={{ fontSize: 25 }} className="" />,
        path: "/admin/businesssetting",
      },
      {
        menu: "Notification and Reminder",
        icon: <NotificationsIcon sx={{ fontSize: 25 }} />,
        path: "/admin/notification",
      },
      {
        menu: "Support and Help",
        icon: <HeadsetMicIcon sx={{ fontSize: 25 }} />,
        path: "/admin/support",
      },
    ],
  };
  return (
    <div className="h-screen w-screen relative">
      <Header
        icon={<HomeIcon className="text-white" />}
        pageTitle="Dashboard"
        onToggleMenu={onToggleMenu}
      />
      {openSidebar ? (
        <Sidebar title={sidebarData.title} menus={sidebarData.menus} />
      ) : (
        <MobileSidebar title={sidebarData.title} menus={sidebarData.menus} />
      )}
      {children}
    </div>
  );
}
