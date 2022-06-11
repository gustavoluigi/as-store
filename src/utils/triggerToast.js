import { ToastContainer, toast } from 'react-toastify';

export const triggerToast = (type, msg) => {
  const toastConfig = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'success':
      toast.success(msg, toastConfig);
      break;
    case 'error':
      toast.error(msg, toastConfig);
      break;
    default:
      toast(msg, toastConfig);
  }
};

export function Toast() {
  return <ToastContainer theme="colored" />;
}
