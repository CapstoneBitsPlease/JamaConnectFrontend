import React from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import makeToast from "../components/Toaster";
const SyncManually = () => {
  const token = useStoreState((state) => state.accountStore.token);
  const itemID = useStoreState((state) =>state.jamaitem.itemID);
  console.log(token);
  console.log(itemID);
  const jamaIDRef = React.createRef();
  const syncItem = () => {
    axios
      .post(`http://127.0.0.1:5000/sync/single?item_id=${jamaIDRef.current.value}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(() => {
        makeToast("success", "Sync successfully");
      })
      .catch((error) => {
        makeToast("error", "Invalid input");
        console.log("HELLOOO", error);
      });
  };
  
  return (
    <div>
      <p>Please enter the Jama Item ID</p>
      <input
        type="jamaID"
        name="jamaID"
        id="jamaID"
        placeholder="jamaID"
        ref={jamaIDRef}
      />
      <button id ="send" onClick={syncItem}>Sync</button>
    </div>
  );
};
export default SyncManually;
