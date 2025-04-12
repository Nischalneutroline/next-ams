export function capitalizeFirstChar(word: string) {
  if (word.length === 0) return word; // Return the word if it's empty
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const getFormErrorMsg = (errors: any, inputName: string) => {
  const error = errors?.[inputName];
  return error?.message ? error.message.toString() : "";
};
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
