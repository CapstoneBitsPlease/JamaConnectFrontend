import { action, thunk } from "easy-peasy";
import axios from "axios";
import makeToast from '../components/Toaster';

const devURL = "http://127.0.0.1:5000"; // will be changed once we use a prod server


// holds sync-related state and actions that don't require tokens
const syncStore = {
    prevSyncTime: 0,
    numFieldsToSync: 0,
    timeUnit: "",
    syncInterval: "",

    // API call to retrieve the length of time of last sync from the capstone database
    getPrevSyncTime: thunk(async(actions) => {
        await axios
        .get(
            `${devURL}/capstone/last_successful_sync_time`
        )
        .then(response => {
            console.log("success");
            console.log(response.data);
            if(response.data === "No successful syncs yet.")
                actions.setPrevSyncTime(response.data)
            else {
                actions.setPrevSyncTime(response.data[0]);
                actions.setTimeUnit(response.data[1]);
            }
        })
        .catch((error) => {
            console.log("error:", error);
            makeToast("error", "Error retrieving last sync time. Please see the error logs located in the admin settings"); 
        });
    }),

    setPrevSyncTime: action((state, newPrevSyncTime) => {
        state.prevSyncTime = newPrevSyncTime;
    }),

    setTimeUnit: action((state, newTimeUnit) => {
        state.timeUnit = newTimeUnit;
    }),

    // API call to retrieve the number of fields ready to sync from the capstone database
    getNumFieldsToSync: thunk(async(actions) => {
        await axios
        .get(`${devURL}/capstone/fields_to_sync`)
        .then(response => {
            actions.setNumFieldsToSync(response.data["num_fields"]);
        })
        .catch(error => {
            console.log("error:", error);
            makeToast("error", "Error retrieving fields ready to sync. Please see the error logs located in the admin settings");
        });
    }),

    setNumFieldsToSync: action((state, newNumFields) => {
        state.numFieldsToSync = newNumFields;
    }),

    setSyncInterval: action((state, newSyncInterval) => {
        state.syncInterval = newSyncInterval
    })
}

export default syncStore;