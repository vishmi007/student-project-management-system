import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Toast({ status, feedbackMessage }) {

  const notifySuccess = (msgSuccess) =>
    toast.success(msgSuccess, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (msgError) =>
    toast.error(msgError, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  status === "success" && notifySuccess(feedbackMessage);
  status === "error" && notifyError(feedbackMessage);

  return (
    <ToastContainer
      className='signup-custom-toast'
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme='light'
    />
  );
}
