"use client";
import { useState, useEffect } from "react";
import { InputSchema } from "@/schemas/schema";
import { formDivCss, formErrorCss, formInputCss, formLabelCss } from "./props";
import { getFormErrorMsg } from "@/utils/utils";

interface OptionType {
  label: string;
  value: string;
}

interface MultiCheckboxProps extends InputSchema {
  options: OptionType[];
}

export const CheckboxInput = (props: MultiCheckboxProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { options, common, css, form } = props;
  const { input, label, showImportant, icon } = common;
  const { errors, setValue } = form;

  const errorMsg = getFormErrorMsg(errors, input);

  const finalDivCss = css?.divCss ?? formDivCss;
  const finalLabelCss = css?.labelCss ?? formLabelCss;
  const finalInputCss = css?.inputCss ?? formInputCss;

  const isSelected = (val: string) => selected.includes(val);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    setValue(input, selected);
  }, [selected, setValue, input]);

  return (
    <div className={finalDivCss}>
      {label && (
        <label className={finalLabelCss} htmlFor={input}>
          {icon && icon} {label}
          {showImportant && <span className="text-red-400">*</span>}
        </label>
      )}

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <div
            key={opt.value}
            className="cols-span-1 flex items-center space-x-2 cursor-pointer"
            onClick={() => toggleOption(opt.value)}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-all
                ${
                  isSelected(opt.value)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-400 text-gray-500"
                }`}
            >
              {isSelected(opt.value) ? "✓" : "-"}
            </div>
            <span
              className={`border px-4 py-[6px] h-[35px] rounded-md transition-all flex items-center text-[14px]
                ${
                  isSelected(opt.value)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-400 text-black"
                }`}
            >
              {opt.label}
            </span>
          </div>
        ))}
      </div>

      {errorMsg && (
        <span className={`${formErrorCss} text-red-500 pt-1 text-sm`}>
          {errorMsg}
        </span>
      )}
    </div>
  );
};
