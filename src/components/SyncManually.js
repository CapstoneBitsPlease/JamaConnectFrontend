import React from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import makeToast from "../components/Toaster";
import "../styles/components/SyncManually.style.sass";
const SyncManually = () => {
  const token = useStoreState((state) => state.accountStore.token);
  const itemID = useStoreState((state) => state.jamaitem.itemID);
  console.log(token);
  console.log(itemID);
  const inputIDRef = React.createRef();
  const syncItem = () => {
    axios
      .post(
        `http://127.0.0.1:5000/sync/single?item_id=${inputIDRef.current.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        makeToast("success", "Sync successfully");
      })
      .catch(() => {
        makeToast("error", "Invalid input or you have not linked the items");
      });
  };

  return (
    <div className="sync-container">
      <div className="sync-wrapper">
        <h2>Please enter the Jama Item ID</h2>
        <input type="inputID" name="inputID" id="inputID" ref={inputIDRef} />
        <button id="send" onClick={syncItem}>
          Sync
        </button>
      </div>
    </div>
  );
};
export default SyncManually;
