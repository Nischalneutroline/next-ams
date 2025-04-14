import {
  addUserBtnProps,
  commonActions,
  fullNameProps,
} from "@/features/shared-features/form/formporps";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { motion, AnimatePresence } from "framer-motion";
import CenterSection from "@/features/shared-features/section/centersection";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "@/features/shared-features/form/inputtext";
import Button from "@/features/shared-features/common/button";

const AddFAQ = (isFlag: any) => {
  // On submit funciton
  const onSubmit = (data: any) => {
    console.log("Transformed data:", data);
  };

  const [isOpen, setIsOpen] = useState<any>(isFlag);
  // React-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
    trigger,
    control,
  } = useForm({});

  const form = {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    watch,
    getValues,
    control,
    trigger,
  };

  const formRef = useRef<HTMLDivElement>(null);

  const remaining = { actions: commonActions, form, css: {} };

  const formObj = {
    question: {
      common: fullNameProps({
        input: "question",
        label: "Questions",
        placeholder: "Enter FAQ Question.",
        showImportant: true,
        type: "text",
      }),
      ...remaining,
    },
    answer: {
      common: fullNameProps({
        input: "answer",
        label: "Answer",
        placeholder: "Enter FAQ Answer.",
        showImportant: true,
        type: "textbox",
      }),
      ...remaining,
    },
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <CenterSection>
          <motion.div
            ref={formRef}
            initial={{ y: 50, scale: 0.9 }}
            animate={{ y: 0, scale: [0.9, 1.02, 1] }}
            exit={{ y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[90%] sm:h-[40%] lg:h-[45%] w-[90%] sm:w-[75%] lg:w-[50%] bg-white rounded-2xl shadow-xl flex flex-col overflow-y-auto gap-4"
          >
            <div className="relative h-[120px] lg:h-[140px] bg-gradient-to-b from-blue-300 to-white flex flex-col text-black justify-items-center  py-2 gap-2 px-4">
              <div className="flex md:flex-col items-center justify-center gap-2 md:gap-0 pt-3">
                <PersonAddAltIcon
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "22px",
                      lg: "24px",
                      xl: "28px",
                    },
                  }}
                />
                <div className="text-[16px] sm:text-[18px] md:text-[20px] 2xl:text-[32px] font-normal lg:font-semibold ">
                  Add New FAQ
                </div>
              </div>
              <div className="flex justify-center text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64]">
                You’re creating an account on behalf of a user. Please ensure
                accuracy. ⚠️
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => setIsOpen(false)}
              >
                <CloseIcon />
              </div>
            </div>
            <TextInput {...formObj.question} />
            <TextInput {...formObj.answer} />
            <div className=" flex mb-0  w-full justify-center gap-4">
              <Button {...addUserBtnProps} />
              {/* <button
          className="px-4 py-2 flex gap-1 justify-center items-center  bg-gradient-to-r from-[#2B73FF] to-[#038FFF] text-white  font-[700] text-[14px] rounded-sm"
          type="submit"
        >
          Submit
        </button> */}
            </div>
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default AddFAQ;
