import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import makeToast from "../components/Toaster";
import Button from "@atlaskit/button";
import "../styles/components/SyncManually.style.sass";

const SyncManually = () => {
  const token = useStoreState((state) => state.accountStore.token);
  const itemID = useStoreState((state) => state.jamaitem.itemID);
  const [linkedJamaItems, setLinkedJamaItems] = useState([]);
  console.log(itemID);
  const inputIDRef = React.createRef();

  const syncItem = () => {
    var success = false;

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
        success = true;
      })
      .catch(() => {
        makeToast("error", "Invalid input or you have not linked the items");
      });

    return success;
  };

  //check if there is item being sync at this time so that we are not supposed to manually sync
  //item at this time
  const check_sync = () => {
    axios
      .get(`http://127.0.0.1:5000/capstone/last_sync_time`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,PUT,POST,DELETE,OPTIONS",
        },
      })
      .then((res) => {
        console.log(res);
        const temp = res.data["Completed on"];
        console.log(res.data["Completed on"]);
        if (temp === " ") {
          makeToast("error", "There is item syncing being process");
          console.log("There is a space");
        }
      })
      .catch((err) => {
        console.log(err);
        makeToast("error", "There is something wrong with your Jama ID");
      });
  };

  // API call to get all linked Jama items from capstone DB
  const getLinkedJamaItems = () => {
    axios
      .get(`http://127.0.0.1:5000/capstone/get_linked_jama_items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLinkedJamaItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handles "Show linked items" button. displays list of linked items
  const handleShowLinkedItems = () => {
    var div = document.getElementById("linked-item-list");

    if (linkedJamaItems.length !== 0) {
      div.innerHTML = linkedJamaItems
        .map((item) => {
          const [jamaID, itemName] = item;
          // eslint-disable-next-line no-useless-concat
          return (
            "<li class=linked-item>" +
            "ID: " +
            jamaID +
            "<br>" +
            "Item Name: " +
            itemName +
            "</li>"
          );
        })
        .join("");
    } else {
      makeToast("error", "No linked Jama items in the capstone database.");
    }
  };

  // handles "Sync" button
  const handleSync = () => {
    // check that a sync is not in progress, then try to sync the item
    check_sync();
    var success = syncItem();

    // show option to view linked items if sync is not successful
    if (success === false) {
      getLinkedJamaItems();
      document.getElementById("show-items-button").style.visibility = "visible";
    }

    // clear input
    document.getElementById("inputID").value = "";
  };

  return (
    <div className="sync-container">
      <div id="sync-wrapper" className="sync-wrapper">
        <p>Please enter the Jama Item ID</p>
        <input type="inputID" name="inputID" id="inputID" ref={inputIDRef} />
        <Button
          id="submit"
          appearance="primary"
          type="button"
          onClick={handleSync}
        >
          Sync
        </Button>
      </div>
      <Button
        id="submit"
        appearance="primary"
        type="button"
        onClick={handleShowLinkedItems}
      >
        Show linked items
      </Button>
      <ul id="linked-item-list" className="linked-item-list"></ul>
    </div>
  );
};
export default SyncManually;
