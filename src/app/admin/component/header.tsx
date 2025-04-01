import CountryFlag from "@/app/components/header/countryflags";
import HeaderSearch from "@/app/components/header/headersearch";
import HeaderTitle from "@/app/components/header/headertitle";
import UserProfile from "@/app/components/header/userprofile";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

interface HeaderProps {
  icon: React.ReactNode;
  pageTitle: string;
  onToggleMenu: () => void;
}

const Header = (props: HeaderProps) => {
  const { icon, pageTitle, onToggleMenu } = props;
  return (
    <div className="relative min-h-[376px] bg-[#287AFF] rounded-b-[12px] ">
      <div className="flex flex-col absolute top-2 md:top-3 lg:top-4 w-full px-4 md:px-6 lg:right-0  lg:max-w-[calc(100vw-325px)] xl:pl-2 xl:pr-12">
        <div className="flex h-[60px] w-full items-center justify-between">
          <HeaderTitle
            icon={
              <HomeRoundedIcon
                sx={{ fontSize: "25px" }}
                className="text-white"
              />
            }
            onToggleMenu={onToggleMenu}
            pageTitle={"Dashboard"}
          />
          <div className="flex gap-6 items-center">
            <HeaderSearch />
            <CountryFlag countryCode="US" />
            <div className="flex gap-4 items-center">
              <div className="relative flex items-center justify-center h-[30px] w-[30px] lg:h-[35px] lg:w-[35px] 2xl:h-[45px] 2xl:w-[45px] bg-white rounded-[20%]">
                <div className="absolute bg-red-400 lg:h-2 lg:w-2 h-[6px] w-[6px] top-1 right-1 2xl:top-2 2xl:right-2 rounded-full" />
                <NotificationsNoneOutlinedIcon
                  sx={{
                    fontSize: {
                      sm: "23px",
                      lg: "25px",
                      xl: "30px",
                    },
                  }}
                  className="text-[#FFA412]"
                />
              </div>

              <UserProfile userName="musfiq" role="admin " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
