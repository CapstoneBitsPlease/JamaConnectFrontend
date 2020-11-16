import React from "react";
import axios from "axios";
import "../styles/components/SyncError.style.sass";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import Banner from "@atlaskit/banner";

const ErrorLog = () => {
  axios
    .get(`http://127.0.0.1:5000/get_logs`)
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => {});

  return (
    <div className="syncerror-container">
      <Banner
        appearance="error"
        icon={<ErrorIcon label="Error icon" secondaryColor="inherit" />}
        isOpen
      >
        Error message goes here
      </Banner>
    </div>
  );
};

export default ErrorLog;
