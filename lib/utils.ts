import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from 'react-toastify';
import { ETypeNotification } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function notify(message : string, type : ETypeNotification) {
  type === ETypeNotification.info && toast.info(message, { position : 'bottom-center'})
  type === ETypeNotification.success && toast.success(message, { position : 'bottom-center'})
  type === ETypeNotification.error && toast.error(message, { position : 'bottom-center'})
  type === ETypeNotification.warning && toast.warning(message, { position : 'bottom-center'})
}