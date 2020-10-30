import { action, thunk } from "easy-peasy";
import axios from "axios";

const syncStore = {
    // state across syncing components
    prevSyncTime: 0,
    numFieldsToSync: 0,
    timeUnit: "",
    syncInterval: "",
    linkedData: [],
    responseLength: 0,
    checkedIDs: [],

    // API call to retrieve the length of time of last sync from the capstone database
    getPrevSyncTime: thunk((actions) => {
    axios
      .get(
        `http://127.0.0.1:5000/capstone/last_sync_time`
      )
      .then(response => {
        console.log("success");
        actions.setPrevSyncTime(response.data[0]);
        actions.setTimeUnit(response.data[1]);
    
      })
      .catch(() => {
        console.log("error");
      });
    }),

    setPrevSyncTime: action((state, newPrevSyncTime) => {
        state.prevSyncTime = newPrevSyncTime;
    }),

    setTimeUnit: action((state, newTimeUnit) => {
        state.timeUnit = newTimeUnit;
    }),

    // API call to retrieve the number of fields ready to sync from the capstone database
    getNumFieldsToSync: thunk((actions) => {
        axios
        .get("http://127.0.0.1:5000/capstone/fields_to_sync")
        .then(response => {
            console.log(response.data);
            actions.setNumFieldsToSync(response.data["num_fields"]);
            actions.setLinkedData(response.data["fields_to_sync"]);
            actions.setResponseLength(response.data["num_fields"]);
        })
        .catch(error => {
            console.log(error);
            // add it to the log on server
        });
    }),

    setNumFieldsToSync: action((state, newNumFields) => {
        state.numFieldsToSync = newNumFields;
    }),

    setSyncInterval: action((state, newSyncInterval) => {
        state.syncInterval = newSyncInterval
    }),

    // API call to retrieve the content of the fields ready to sync from the capstone db
    getFieldsToSync: thunk((actions) => {
        axios
        .get("http://127.0.0.1:5000/capstone/fields_to_sync")
        .then(response => {
            console.log("success");
            actions.setLinkedData(response.data["fields_to_sync"]);
            actions.setResponseLength(response.data["num_fields"]);
        })
        .catch(error => {
            console.log(error);
            // add it to the log on server
        });
    }),

    setLinkedData: action((state, newLinkedData) => {
        state.linkedData = newLinkedData;
    }),

    setResponseLength: action((state, newResponseLength) => {
        state.responseLength = newResponseLength;
    }),

    // adds values of the checked checkboxes to an array
    setCheckedIDs: action((state, newCheckedIDs) => {
        state.checkedIds = newCheckedIDs;
    })

}

export default syncStore;