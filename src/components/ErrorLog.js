import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components/ErrorLog.style.sass";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import Banner from "@atlaskit/banner";

const ErrorLog = () => {
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/get_logs`)
      .then((res) => {
        console.log(res.data);
        setMyData(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="syncerror-container">
      {myData.map((data) => (
        <div>
          <p>{data.asctime}</p>
          <p>{data.levelname}</p>
          <p>{data.message}</p>
          <p>{data.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ErrorLog;
