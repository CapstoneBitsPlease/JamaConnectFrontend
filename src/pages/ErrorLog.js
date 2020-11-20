import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/ErrorLog.style.sass";

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
        <div className="syncerror-wrapper">
          <p>Asctime: {data.asctime}</p>
          <p>Levelname: {data.levelname}</p>
          <p>Message: {data.message}</p>
          <p>Name: {data.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ErrorLog;
