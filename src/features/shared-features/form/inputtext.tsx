import { InputSchema } from "@/schemas/schema";
import { formErrorCss, formInputCss } from "./props";
import { FormSpanError } from "./error/fromspanerror";
import { getFormErrorMsg } from "@/utils/utils";

export default function TextInput(props: InputSchema) {
  // Props
  const { common, actions, form, css } = props;
  // Props variables
  const { input, label, defaultValue, placeholder, showImportant, icon } =
    common;
  const { register, errors } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } =
    actions! || {};
  const { inputCss, errorCss } = css || {};
  // Values
  const errorMsg = getFormErrorMsg(errors, input);
  // Css
  const highlightBorder =
    "border focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
  const errorBorder =
    "border border-red-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400";
  const border = errorMsg ? errorBorder : highlightBorder;

  // Final Css
  const finalInputCss = inputCss ?? formInputCss;

  // Error Props
  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  return (
    <div
      className={`relative h-[75px] pt-1 flex flex-col gap-1 text-[11px] text-dark-100 w-full px-2 min-w-[150px]`}
    >
      {label && (
        <label
          className="font-semibold flex gap-2 text-sm px-2"
          htmlFor={input}
        >
          {label} {showImportant && <span className="text-red-400">*</span>}
        </label>
      )}
      {icon && icon}
      <input
        id={input}
        {...(register && register(input))}
        className={`bg-input-100 rounded-md relative h-[2rem] flex px-2 gap-1 text-[11px] text-dark-100 justify-start items-start  w-full ${border} ${finalInputCss}`}
        type="text"
        placeholder={placeholder}
        key={input}
        defaultValue={defaultValue ?? ""}
        onClick={handleClick}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />
      {errorMsg && <FormSpanError {...errorProps} />}
    </div>
  );
}
