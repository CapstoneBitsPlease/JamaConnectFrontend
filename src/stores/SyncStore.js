import {action, thunk} from "easy-peasy";
import axios from "axios";

const devURL = "http://127.0.0.1:5000"; 

// store to hold sync-related state and actions that don't require tokens
const syncStore = {
    prevSyncTime: 0,
    numFieldsToSync: 0,
    timeUnit: "",
    syncInterval: 5,
    selectedTimeUnit: "minutes",  // default interval is 5 minutes 

    /* API calls */

    // retrieve the length of time of last sync from the capstone database
    getPrevSyncTime: thunk(async(actions) => {
        await axios
        .get(`${devURL}/capstone/last_successful_sync_time`)
        .then(response => {
            console.log("success");
            console.log(response.data);
            if(response.data === "No successful syncs yet.")
                actions.setPrevSyncTime(response.data);
            else {
                actions.setPrevSyncTime(response.data[0]);
                actions.setTimeUnit(response.data[1]);
            }
        })
        .catch((error) => {
            console.log("error:", error); 
        });
    }),

    // retrieve the number of fields ready to sync from the capstone database
    getNumFieldsToSync: thunk(async(actions) => {
        await axios
        .get(`${devURL}/capstone/fields_to_sync`)
        .then(response => {
            actions.setNumFieldsToSync(response.data["num_fields"]);
        })
        .catch(error => {
            console.log("error:", error);
        });
    }),

    /* Actions to set state */

    // set previous length of time a sync took to complete
    setPrevSyncTime: action((state, newPrevSyncTime) => {
        state.prevSyncTime = newPrevSyncTime;
    }),

    // set time units of prevSyncTime 
    setTimeUnit: action((state, newTimeUnit) => {
        state.timeUnit = newTimeUnit;
    }),

    // set number of fields ready to be synced 
    setNumFieldsToSync: action((state, newNumFields) => {
        state.numFieldsToSync = newNumFields;
    }),

    // set sync interval
    setSyncInterval: action((state, newSyncInterval) => {
        state.syncInterval = newSyncInterval
    }),

    // set time unit for sync interval
    setSelectedTimeUnit: action((state, newSelectedTimeUnit) => {
        state.selectedTimeUnit = newSelectedTimeUnit;
    })
}

export default syncStore;