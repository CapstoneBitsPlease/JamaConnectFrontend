import { action, thunk } from "easy-peasy";
import axios from "axios";

const devURL = "http://127.0.0.1:5000"; // will be changed once we use a prod server

const syncStore = {
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
            `${devURL}/capstone/last_sync_time`
        )
        .then(response => {
            console.log("success");
            actions.setPrevSyncTime(response.data[0]);
            actions.setTimeUnit(response.data[1]);
        })
        .catch((error) => {
            console.log("error:", error);
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
        .get(`${devURL}/capstone/fields_to_sync`)
        .then(response => {
            actions.setNumFieldsToSync(response.data["num_fields"]);
            actions.setLinkedData(response.data["fields_to_sync"]);
            actions.setResponseLength(response.data["num_fields"]);
        })
        .catch(error => {
            console.log("error:", error);
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
        .get(`${devURL}/capstone/fields_to_sync`)
        .then(response => {
            console.log("success");
            actions.setLinkedData(response.data["fields_to_sync"]);
            actions.setResponseLength(response.data["num_fields"]);
        })
        .catch(error => {
            console.log("error:", error);
        });
    }),

    setLinkedData: action((state, newLinkedData) => {
        state.linkedData = newLinkedData;
    }),

    setResponseLength: action((state, newResponseLength) => {
        state.responseLength = newResponseLength;
    }),

    setCheckedIDs: action((state, newCheckedIDs) => {
        state.checkedIDs = newCheckedIDs;
    })

}

export default syncStore;