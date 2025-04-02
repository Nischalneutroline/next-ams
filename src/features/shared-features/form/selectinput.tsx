/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectInputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { FormSpanError } from "./error/fromspanerror";
import { formInputCss, formErrorCss } from "./props";

export default function SelectInput(props: SelectInputSchema) {
  // Props
  const { common, actions, form, css, options } = props;
  // Props variables
  const { input, label, defaultValue, placeholder, showImportant, icon } =
    common;
  const { register, errors } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } = actions!;
  const { divCss, labelCss, inputCss, errorCss } = css!;

  // Values
  const errorMsg = getFormErrorMsg(errors, input);

  // Css

  const finalInputCss = inputCss ?? formInputCss;
  // Css
  const highlightBorder =
    "border focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
  const errorBorder =
    "border border-red-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400";
  const border = errorMsg ? errorBorder : highlightBorder;

  // Error Props
  // const labelErrorProps = { css: {}, title: "*" };
  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  return (
    <div
      className={`relative h-[65px] sm:h-[65px] lg:h-[75px] 2xl:h-[95px] pt-1 flex flex-col gap-1 text-[11px] text-dark-100 w-full px-2 min-w-[150px] `}
    >
      {label && (
        <label
          className="text-black font-semibold flex gap-2 text-[12px] sm:text-[14px] lg:text-[16px] 2xl:text-[18px] items-center"
          htmlFor={input}
        >
          {icon && icon} {label}
          {showImportant && <span className="text-red-400">*</span>}
        </label>
      )}
      <select
        id={`${input}`}
        {...register(input)}
        className={`bg-[#F8F9FA] rounded-md relative h-[40px] sm:h-[35px] lg:h-[40px] 2xl:h-[45px] px-2 text-[11px] 2xl:text-[16px] text-black border-gray-400 text-left w-full ${finalInputCss} ${border} custom-select`}
        type="text"
        placeholder={placeholder}
        key={`${input}-select`}
        defaultValue={defaultValue || ""}
        onClick={handleClick}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      >
        {options?.map((item: any, idx: number) => (
          <option key={`${idx}. ${item.value}`} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <div className="-translate-y-17">
        {errorMsg && <FormSpanError {...errorProps} />}
      </div>
    </div>
  );
}
