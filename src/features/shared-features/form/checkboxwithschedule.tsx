"use client";
import { useState, useEffect } from "react";
import { DateInput, TimeInput } from "./dayinput";
import { formDivCss, formErrorCss, formInputCss, formLabelCss } from "./props";
import { getFormErrorMsg } from "@/utils/utils";
import { InputSchema } from "@/schemas/schema";

type CheckboxOption = {
  label: string;
  value: string;
  showSchedule?: boolean;
};

interface GenericCheckboxWithScheduleProps extends InputSchema {
  options: CheckboxOption[];
  scheduleField?: string; // e.g., "scheduledTime"
}

export const CheckboxWithSchedule = (
  props: GenericCheckboxWithScheduleProps
) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const {
    options,
    common,
    css,
    form,
    scheduleField = "scheduledTime", // default key name
  } = props;

  const { input, label, icon, showImportant } = common;
  const { errors, setValue } = form;

  const errorMsg = getFormErrorMsg(errors, input);

  const finalDivCss = css?.divCss ?? formDivCss;
  const finalLabelCss = css?.labelCss ?? formLabelCss;

  const isSelected = (val: string) => selected.includes(val);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    // set selectedChannels as array of objects like { method: "email" }
    const mapped = selected.map((method) => ({ method }));
    setValue(input, mapped);

    // if "schedule" is selected, set nested scheduledTime
    if (selected.includes("schedule")) {
      setValue(scheduleField, {
        date: scheduleDate,
        time: scheduleTime,
      });
    } else {
      setValue(scheduleField, null); // clear it if not selected
    }
  }, [selected, scheduleDate, scheduleTime, input, scheduleField, setValue]);

  const hasSchedule = options.some(
    (opt) => opt.showSchedule && selected.includes(opt.value)
  );

  return (
    <div className={`${finalDivCss} ${hasSchedule ? "min-h-[212px]" : ""}`}>
      {label && (
        <label className={finalLabelCss}>
          {icon} {label}{" "}
          {showImportant && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex  gap-8">
        {options.map((opt) => (
          <div
            key={opt.value}
            className="flex items-center space-x-2 cursor-pointer"
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

      {hasSchedule && (
        <div className="flex gap-4 pt-2">
          <div className="">
            <DateInput
              common={{
                input: `${scheduleField}.date`,
                label: "Date",
                placeholder: "Select a date",
                showImportant: true,
              }}
              form={form}
              css={{}}
              actions={{
                handleOnChange: (val: any) => setScheduleDate(val),
              }}
            />
          </div>
          <div className="">
            <TimeInput
              common={{
                input: `${scheduleField}.time`,
                label: "Time",
                placeholder: "Pick time",
                showImportant: true,
              }}
              form={form}
              css={{}}
              actions={{
                handleOnChange: (val: any) => setScheduleTime(val),
              }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <span className={`${formErrorCss} text-red-500 pt-1 text-sm`}>
          {errorMsg}
        </span>
      )}
    </div>
  );
};
