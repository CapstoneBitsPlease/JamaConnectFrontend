import React from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import makeToast from "../components/Toaster";
export const SyncManually = () => {
  const token = useStoreState((state) => state.accountStore.token);
  console.log(token);
  const jamaIDRef = React.createRef();
  const syncItem = () => {
    axios
      .post(`http://127.0.0.1:5000/sync/single?item_id=${jamaIDRef}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((reponse) => {
        makeToast("success", "Sync successfully");
      })
      .catch(() => {
        makeToast("error", "Invalid input");
      });
  };

  return (
    <div>
      <p>Please enter the Jama Item ID</p>
      <input
        type="jamaID"
        name="jamaID"
        id="ujamaID"
        placeholder="jamaID"
        ref={jamaIDRef}
      />
      <button id ="send" onClick={syncItem}>Send</button>
    </div>
  );
};
export default SyncManually;
