import React, { useEffect } from "react";
import "./Alert.css";

const Alert = ({ type, msg, disappearingAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      disappearingAlert();
      // Here showAlert() will be invoked with default values {show:false,type:"",msg:""} and our Alert gets un-mounted after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  });
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
