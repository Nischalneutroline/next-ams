import { getFormErrorMsg } from "@/utils/utils";
import { useEffect, useState } from "react";
import { FormSpanError } from "./error/fromspanerror";
import { formDivCss, formLabelCss, formErrorCss } from "./props";
import { v4 as uuidv4 } from "uuid";
import { Controller } from "react-hook-form";

const daysOfWeek = [
  { label: "Mon", value: "MONDAY" },
  { label: "Tue", value: "TUESDAY" },
  { label: "Wed", value: "WEDNESDAY" },
  { label: "Thu", value: "THURSDAY" },
  { label: "Fri", value: "FRIDAY" },
  { label: "Sat", value: "SATURDAY" },
  { label: "Sun", value: "SUNDAY" },
];

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

type ServiceAvailability = {
  weekDay: string;
  timeSlots: TimeSlot[];
};

export function DayAndTimeSelection(props: any) {
  const { common, form, css } = props;
  const { input, label, showImportant, icon } = common;
  const { control, errors } = form;

  const { divCss, labelCss, errorCss } = css ?? {};
  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;

  const errorMsg = getFormErrorMsg(errors, input);

  return (
    <Controller
      name={input}
      control={control}
      defaultValue={[]}
      render={({ field: { value = [], onChange } }) => {
        const [currentDay, setCurrentDay] = useState<string>("MONDAY");

        const getDayData = (day: string): ServiceAvailability => {
          return (
            value.find((d: ServiceAvailability) => d.weekDay === day) ?? {
              weekDay: day,
              timeSlots: [{ id: uuidv4(), startTime: "", endTime: "" }],
            }
          );
        };

        const updateDaySlots = (day: string, slots: TimeSlot[]) => {
          const updated = value.some(
            (d: ServiceAvailability) => d.weekDay === day
          )
            ? value.map((d: ServiceAvailability) =>
                d.weekDay === day ? { ...d, timeSlots: slots } : d
              )
            : [...value, { weekDay: day, timeSlots: slots }];
          onChange(updated);
        };

        const addTimeSlot = () => {
          const dayData = getDayData(currentDay);
          const newSlot: TimeSlot = {
            id: uuidv4(),
            startTime: "",
            endTime: "",
          };
          updateDaySlots(currentDay, [...dayData.timeSlots, newSlot]);
        };

        const removeTimeSlot = (slotId: string) => {
          const dayData = getDayData(currentDay);
          if (dayData.timeSlots.length > 1) {
            const updated = dayData.timeSlots.filter(
              (slot) => slot.id !== slotId
            );
            updateDaySlots(currentDay, updated);
          }
        };

        const updateSlotValue = (
          slotId: string,
          field: "startTime" | "endTime",
          val: string
        ) => {
          const dayData = getDayData(currentDay);
          const updated = dayData.timeSlots.map((slot) =>
            slot.id === slotId ? { ...slot, [field]: val } : slot
          );
          updateDaySlots(currentDay, updated);
        };

        const selectedDaySlots = getDayData(currentDay).timeSlots;

        return (
          <div className={`${finalDivCss} px-4 pb-2 space-y-2`}>
            {label && (
              <label className={finalLabelCss} htmlFor={input}>
                {icon && icon} {label}
                {showImportant && <span className="text-red-400">*</span>}
              </label>
            )}

            {/* Day Buttons */}
            <div className="grid grid-cols-3 sm:flex gap-x-8 gap-y-3    mb-4">
              {daysOfWeek.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => setCurrentDay(day.value)}
                  className={`w-[80px] py-2 rounded-lg border text-[13px] font-medium transition-all ${
                    currentDay === day.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 border-gray-300 text-black/60 hover:bg-gray-200"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>

            {/* Time Slots Section */}
            <div className="w-full max-w-md mx-auto space-y-2">
              {selectedDaySlots.length > 0 && (
                <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium px-1">
                  <span className="w-full">Start Time</span>
                  <span className="w-full pl-7">End Time</span>
                </div>
              )}

              {selectedDaySlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-row gap-1 items-center justify-between gap-2"
                >
                  <input
                    type="time"
                    className="border rounded-lg px-2 py-1 w-full h-6 sm:h-8 lg:h-10 text-black text-[12px] sm:text-[13px] lg:text-[14px]"
                    value={slot.startTime}
                    onChange={(e) =>
                      updateSlotValue(slot.id, "startTime", e.target.value)
                    }
                  />
                  <span className="mx-2 text-gray-600">to</span>
                  <input
                    type="time"
                    className="border rounded-lg px-2 py-1 w-full h-6 sm:h-8 lg:h-10  text-black  text-[12px] sm:text-[13px] lg:text-[14px]"
                    value={slot.endTime}
                    onChange={(e) =>
                      updateSlotValue(slot.id, "endTime", e.target.value)
                    }
                  />
                  <div className="flex lfex-row sm:flex-col gap-3 ">
                    {selectedDaySlots.length > 1 && (
                      <button
                        type="button"
                        className="text-red-500 text-[13px]"
                        onClick={() => removeTimeSlot(slot.id)}
                      >
                        ✕
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={addTimeSlot}
                      className="px-[6px] pb-[1px] rounded bg-blue-500 text-white text-[13px] hover:bg-blue-600 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {errorMsg && (
              <FormSpanError
                css={{ customCss: errorCss ?? formErrorCss }}
                title={errorMsg}
              />
            )}
          </div>
        );
      }}
    />
  );
}
