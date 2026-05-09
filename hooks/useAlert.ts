import Swal from "sweetalert2";

type AlertType = "success" | "error" | "warning" | "info" | "question";

interface AlertConfig {
  title: string;
  message?: string;
  type?: AlertType;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  icon?: AlertType;
}

export const useAlert = () => {
  const showAlert = async (config: AlertConfig) => {
    const {
      title,
      message = "",
      type = "info",
      showConfirmButton = true,
      confirmButtonText = "OK",
      showCancelButton = false,
      cancelButtonText = "Cancel",
      icon = type,
    } = config;

    return Swal.fire({
      title,
      text: message,
      icon: icon as any,
      confirmButtonText,
      showConfirmButton,
      cancelButtonText,
      showCancelButton,
      confirmButtonColor: "#10b981", // emerald-500
      cancelButtonColor: "#ef4444", // red-500
      didOpen: (modal) => {
        modal.style.borderRadius = "12px";
      },
    });
  };

  const success = (title: string, message?: string) => {
    return showAlert({
      title,
      message,
      type: "success",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const error = (title: string, message?: string) => {
    return showAlert({
      title,
      message,
      type: "error",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const warning = (title: string, message?: string) => {
    return showAlert({
      title,
      message,
      type: "warning",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const info = (title: string, message?: string) => {
    return showAlert({
      title,
      message,
      type: "info",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const confirm = (title: string, message?: string) => {
    return showAlert({
      title,
      message,
      type: "question",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
    });
  };

  return {
    showAlert,
    success,
    error,
    warning,
    info,
    confirm,
  };
};
