interface AlertProps {
  title?: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info";
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  imageUrl?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageAlt?: string;
  footer?: string;
  draggable?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  showConfirmButton?: boolean;
  allowOutsideClick?: boolean;
  customClass?: {
    popup?: string;
    backdrop?: string;
  };
  confirmButtonAriaLabel?: string;
  cancelButtonAriaLabel?: string;
  denyButtonText?: string;
  denyButtonAriaLabel?: string;
  denyButtonColor?: string;
  timer?: number;
  html?: string;
  timerProgressBar?: boolean;
  willClose?: () => void;
  showClass?: {
    popup?: string;
    backdrop?: string;
  };
  hideClass?: {
    popup?: string;
    backdrop?: string;
  };
  color?: string;
  background?: string;
  backdrop?: string | boolean;
  didOpen?: () => void;
  preConfirm?: () => void;
  preDeny?: () => void;
}

export type { AlertProps };
