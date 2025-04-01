import React from "react";
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon

interface HeaderTitleProps {
  icon: React.ReactNode; // Accept any React component or element for the icon
  pageTitle: string; // The title of the page to be displayed
  onToggleMenu: () => void; // Function to handle menu toggle
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  icon,
  pageTitle,
  onToggleMenu,
}) => {
  return (
    <div className="flex gap-3 justify-between items-center px-2">
      {icon}
      <span className="flex items-end text-[19px] text-white font-[600] leading-[30px] -tracking-[2%]">
        {pageTitle}
      </span>
      {/* <div onClick={() => onToggleMenu()}>
        <MenuIcon sx={{ fontSize: "24px" }} className="text-white" />
      </div> */}
    </div>
  );
};

export default HeaderTitle;
