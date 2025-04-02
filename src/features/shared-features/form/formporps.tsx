import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
export const fullNameProps = ({ defaultValue }: any) => ({
  input: "full_name",
  label: "Full Name",
  type: "text",
  placeholder: "Enter Full Name",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: <PersonOutlineIcon className="text-black" sx={{ fontSize: "20px" }} />,
});
export const emailProps = ({ defaultValue }: any) => ({
  input: "email",
  label: "Email",
  type: "text",
  placeholder: "Enter Email Address",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: <MailOutlineIcon className="text-black" sx={{ fontSize: "20px" }} />,
});
export const phoneProps = ({ defaultValue }: any) => ({
  input: "phone_number",
  label: "Phone Number",
  type: "phone",
  placeholder: "Enter Valid Phone Number",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: <LocalPhoneIcon className="text-black" sx={{ fontSize: "20px" }} />,
});
export const roleProps = ({ defaultValue }: any) => ({
  input: "role",
  label: "Role",
  type: "select",
  placeholder: "Select Role",
  showImportant: true,
  defaultValue: defaultValue ?? "user",
  icon: <LocalPhoneIcon className="text-black" sx={{ fontSize: "20px" }} />,
});
export const isActiveProps = ({ defaultValue }: any) => ({
  input: "isActive",
  label: "isActive",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: <LocalPhoneIcon className="text-black" sx={{ fontSize: "20px" }} />,
});

export const commonActions = {
  handleClick: null,
  handleKeyUp: null,
  handleKeyDown: null,
  handleOnChange: null,
};

export const addUserBtnProps = {
  title: "Create",
  type: "submit",
  css: {
    customCss:
      "px-4 py-2 flex gap-1 justify-center items-center  bg-gradient-to-r from-[#2B73FF] to-[#038FFF] text-white  font-[700] text-[14px] rounded-sm",
  },
};
