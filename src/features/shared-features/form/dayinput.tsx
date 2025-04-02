/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { InputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { useState, useEffect } from "react";
import { FormSpanError } from "./error/fromspanerror";
import { formDivCss, formLabelCss, formErrorCss } from "./props";

const daysOfWeek = [
  { label: "Mon", value: "Monday" },
  { label: "Tue", value: "Tuesday" },
  { label: "Wed", value: "Wednesday" },
  { label: "Thu", value: "Thursday" },
  { label: "Fri", value: "Friday" },
  { label: "Sat", value: "Saturday" },
  { label: "Sun", value: "Sunday" },
];

export default function DaysSelection(props: InputSchema) {
  // Props
  const { common, form, css } = props;

  // Props variables
  const { input, label } = common;
  const { setValue, errors } = form;
  const { divCss, labelCss, errorCss } = css!;

  // States
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Values
  const errorMsg = getFormErrorMsg(errors, input);

  // Css
  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;

  // Update form value when selectedDays changes
  useEffect(() => {
    setValue(input, selectedDays); // Register the selected days to React Hook Form
  }, [selectedDays, setValue, input]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className={finalDivCss}>
      {label && (
        <label className={finalLabelCss} htmlFor={input}>
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDays.includes(day.value);
          return (
            <div
              key={day.value}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleDay(day.value)}
            >
              {/* Checkbox Icon */}
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-all
                  ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-400 text-gray-500"
                  }`}
              >
                {isSelected ? "✓" : "-"}
              </div>
              {/* Day Label */}
              <span
                className={`border px-4 py-[6px] rounded-md transition-all
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-400 text-black"
                  }`}
              >
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <FormSpanError
          css={{ customCss: errorCss ?? formErrorCss }}
          title={errorMsg}
        />
      )}
    </div>
  );
}
