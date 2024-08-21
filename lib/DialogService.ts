import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const DialogService = {
  del: async (title: string, onSuccess: () => Promise<void>) => {
    Swal.fire({
      title: title,
      color: "#716add",
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      backdrop: `
        rgba(0,0,123,0.4)
        url("/nyan-cat-nyan.gif")
        top
        no-repeat
      `
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onSuccess();
          toast.success('Deleted!');
        } catch (error) {
          toast.error('An error occurred!');
        }
      }
    });
  },

  save: async (title: string, onSuccess: () => Promise<void>) => {
    Swal.fire({
      title: title,
      color: "#716add",
      confirmButtonText: "Save",
      showCancelButton: true,
      backdrop: `
        rgba(0,0,123,0.4)
        url("/nyan-cat-nyan.gif")
        top
        no-repeat
      `
    }).then(async (result) => {
      try {
        if(result.isConfirmed) {
          await onSuccess();
        }
      } catch (error) {
        toast.error('An error occurred!');
      }
    })
  },

  success: (title: string, onSuccess: () => void) => {
    Swal.fire({
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      onSuccess();
    });
  },

  confirm: async (title: string, onSuccess: () => Promise<void>, onCancel?: () => Promise<void>) => {
    Swal.fire({
      title: title,
      color: "#716add",
      confirmButtonText: "Yes",
      confirmButtonColor: "#716add",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onSuccess();
      }
      if(result.isDismissed && onCancel) {
        await onCancel();
        toast.error('Canceled!');
      }
    });
  },
}