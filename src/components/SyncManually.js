import React from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import makeToast from "../components/Toaster";
const SyncManually = () => {
  const token = useStoreState((state) => state.accountStore.token);
  const itemID = useStoreState((state) => state.jamaitem.itemID);
  console.log(token);
  console.log(itemID);
  const jamaIDRef = React.createRef();

  //check if there is item being sync at this time so that we are not supposed to manually sync 
  //item at this time

  const check_sync = () => {
    axios.get(http://127.0.0.1:5000/capstone/last_sync_time,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
        }
      })
      .then(res => {
        console.log(res);
        const temp = res.data["Completed on"];
        console.log(res.data["Completed on"])
        if (temp == " ") {
          makeToast("error", "There is item syncing being process")
          console.log("There is a space")
        }

      })
      .catch(err => {
        console.log(err);
        makeToast("error", "There is something wrong with your Jama ID")
      })
  }

  const syncItem = () => {
    axios
      .post(`http://127.0.0.1:5000/sync/single?item_id=${jamaIDRef.current.value}`, {}, {
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
      <button id="send" onClick={() => { check_sync(); syncItem();}}>Sync</button>
    </div>
  );
};
export default SyncManually;
