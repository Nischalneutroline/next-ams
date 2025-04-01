"use client";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const HeaderSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative h-[50px] hidden xl:block">
      {!isFocused && (
        <SearchRoundedIcon
          sx={{ fontSize: 35 }}
          className="absolute text-[#287AFF] flex items-center top-2 left-4 transition-opacity duration-200"
        />
      )}

      <input
        type="search"
        placeholder={isFocused ? "" : "Search here.."}
        className="h-full w-[312px] bg-amber-50 rounded-[16px] placeholder:pl-14 outline-none px-4"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")} // Hide icon only if input is empty on blur
      />
    </div>
  );
};

export default HeaderSearch;
