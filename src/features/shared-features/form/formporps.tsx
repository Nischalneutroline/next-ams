export const fullNameProps = ({ defaultValue }: any) => ({
  input: "fullName",
  label: "Full Name",
  placeholder: "Enter Full Name",
  showImportant: true,
  defaultValue: defaultValue ?? "",
});

export const commonActions = {
  handleClick: null,
  handleKeyUp: null,
  handleKeyDown: null,
  handleOnChange: null,
};
