import type { AlertProps } from "@/Interfaces/Globals";
import Swal from "sweetalert2";

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
    ...(props?.showCloseButton !== undefined && {
      showCloseButton: props.showCloseButton,
    }),
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
