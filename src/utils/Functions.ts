import type { AlertProps } from "@/Interfaces/Globals";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export const Alert = (props?: AlertProps | null) => {
  Swal.fire({
    ...(props?.title && { title: props.title }),
    ...(props?.text && { text: props.text }),
    ...(props?.icon && { icon: props.icon }),
    ...(props?.confirmButtonText && {
      confirmButtonText: props.confirmButtonText,
    }),
    ...(props?.cancelButtonText && {
      cancelButtonText: props.cancelButtonText,
    }),
    ...(props?.showCancelButton !== undefined && {
      showCancelButton: props.showCancelButton,
    }),
    ...(props?.showConfirmButton !== undefined && {
      showConfirmButton: props.showConfirmButton,
    }),
    ...(props?.showCloseButton !== undefined && {
      showCloseButton: props.showCloseButton,
    }),
    ...(props?.html && { html: props.html }),
    ...(props?.imageUrl && { imageUrl: props.imageUrl }),
    ...(props?.imageWidth && { imageWidth: props.imageWidth }),
    ...(props?.imageHeight && { imageHeight: props.imageHeight }),
    ...(props?.imageAlt && { imageAlt: props.imageAlt }),
    ...(props?.footer && { footer: props.footer }),
    ...(props?.draggable !== undefined && { draggable: props.draggable }),
    ...(props?.confirmButtonColor && {
      confirmButtonColor: props.confirmButtonColor,
    }),
    ...(props?.cancelButtonColor && {
      cancelButtonColor: props.cancelButtonColor,
    }),
    ...(props?.confirmButtonAriaLabel && {
      confirmButtonAriaLabel: props.confirmButtonAriaLabel,
    }),
    ...(props?.cancelButtonAriaLabel && {
      cancelButtonAriaLabel: props.cancelButtonAriaLabel,
    }),
    ...(props?.denyButtonText && { denyButtonText: props.denyButtonText }),
    ...(props?.denyButtonAriaLabel && {
      denyButtonAriaLabel: props.denyButtonAriaLabel,
    }),
    ...(props?.denyButtonColor && { denyButtonColor: props.denyButtonColor }),
    ...(props?.timer && { timer: props.timer }),
    ...(props?.timerProgressBar !== undefined && {
      timerProgressBar: props.timerProgressBar,
    }),
    ...(props?.willClose && { willClose: props.willClose }),
    ...(props?.showClass && {
      showClass: {
        ...(props.showClass.popup && { popup: props.showClass.popup }),
        ...(props.showClass.backdrop && { backdrop: props.showClass.backdrop }),
      },
    }),
    ...(props?.hideClass && {
      hideClass: {
        ...(props.hideClass.popup && { popup: props.hideClass.popup }),
        ...(props.hideClass.backdrop && { backdrop: props.hideClass.backdrop }),
      },
    }),
    ...(props?.color && { color: props.color }),
    ...(props?.background && { background: props.background }),
    ...(props?.backdrop && { backdrop: props.backdrop }),
    ...(props?.didOpen && { didOpen: props.didOpen }),
    ...(props?.preConfirm && { preConfirm: props.preConfirm }),
    ...(props?.preDeny && { preDeny: props.preDeny }),
  });
};

export const GenerateUID = () => {
  return uuidv4();
};

const validateLogin = (loginData: { email: string; password: string }) => {
  const newErrors: Record<string, string> = {};

  if (!loginData.email) {
    newErrors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
    newErrors.email = "El email no es válido";
  }

  if (!loginData.password) {
    newErrors.password = "La contraseña es requerida";
  } else if (loginData.password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return Object.keys(newErrors).length === 0;
};

const validateRegister = (registerData: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const newErrors: Record<string, string> = {};

  if (!registerData.username) {
    newErrors.username = "El nombre de usuario es requerido";
  } else if (registerData.username.length < 3) {
    newErrors.username =
      "El nombre de usuario debe tener al menos 3 caracteres";
  }

  if (!registerData.email) {
    newErrors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
    newErrors.email = "El email no es válido";
  }

  if (!registerData.password) {
    newErrors.password = "La contraseña es requerida";
  } else if (registerData.password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!registerData.confirmPassword) {
    newErrors.confirmPassword = "Confirma tu contraseña";
  } else if (registerData.password !== registerData.confirmPassword) {
    newErrors.confirmPassword = "Las contraseñas no coinciden";
  }

  return Object.keys(newErrors).length === 0;
};

export { validateLogin, validateRegister };
