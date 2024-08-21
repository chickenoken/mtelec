import { toast } from 'react-toastify';

export const AlertService = {
  success: (message: string) => {
    toast.success(message, {
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  },

  warn: (message: string) => {
    toast.warn(message, {
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  },

  error: (message: string) => {
    toast.error(message, {
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  },

}