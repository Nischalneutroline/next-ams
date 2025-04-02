/* eslint-disable @typescript-eslint/no-explicit-any */
// These are custom styles you may have or need to define

import { InputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { FormSpanError } from "./error/fromspanerror";

export default function SwitchInput(props: InputSchema) {
  // Props
  const { common, actions, form, css } = props;

  // Props variables
  const { input, label, defaultValue, placeholder } = common;
  const { register, errors } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } = actions!;
  const { divCss, labelCss } = css!;

  // Values
  const errorMsg = getFormErrorMsg(errors, input);

  // Css

  // Error Props
  const labelErrorProps = { css: {}, title: "*" };
  const errorProps = { css: {}, title: errorMsg };

  return (
    <div className="flex gap-4 items-center space-y-2">
      {label && (
        <label
          htmlFor={input}
          className="flex items-center text-sm font-semibold text-gray-700"
        >
          {label} {errorMsg && <FormSpanError {...labelErrorProps} />}
        </label>
      )}

      <div className="relative inline-block w-14 h-8">
        <input
          id={input}
          {...register(input)}
          className="opacity-0 absolute w-0 h-0"
          type="switch"
          placeholder={placeholder}
          key={input}
          defaultChecked={defaultValue ?? false}
          onClick={handleClick}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        <span className="slider absolute cursor-pointer top-0 left-0 w-full h-full bg-gray-300 rounded-full transition-all duration-300 ease-in-out"></span>
        <span className="slider-circle absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out"></span>
      </div>

      {errorMsg && <FormSpanError {...errorProps} />}
    </div>
  );
}
