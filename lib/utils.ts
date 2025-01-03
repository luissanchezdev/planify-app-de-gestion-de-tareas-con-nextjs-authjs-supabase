import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from 'react-toastify';
import { ETypeNotification } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const notify = (message: string, type: ETypeNotification) => {

  switch (type) {
    case ETypeNotification.success:
      toast.success(message, { position: 'bottom-center'});
      break;
    case ETypeNotification.error:
      toast.error(message, { position: 'bottom-center'});
      break;
    case ETypeNotification.warning:
      toast.warning(message, { position: 'bottom-center'});
      break;
    default:
      toast.info(message, { position: 'bottom-center'});
  }
};