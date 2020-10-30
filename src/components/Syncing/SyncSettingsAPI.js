import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SyncSettingsContainer from './SyncSettingsContainer.js';

const SyncSettingsAPI = () => {
    const [prevSyncTime, setPrevSyncTime] = useState(0); 
    const [numFieldsToSync, setNumFieldsToSync] = useState(0);
    const [timeUnit, setTimeUnit] = useState("");
    const [syncInterval, setSyncInterval] = useState("");

    // makes request to backend and changes prevSync data if successful, otherwise returns and logs an error
    const getPrevSyncTime = () => {
        var url = "http://127.0.0.1:5000/last_sync_time";
        
        axios
        .get(url)
        .then(response => {
            console.log(response.data);
            setPrevSyncTime(response.data[0]);
            setTimeUnit(response.data[1]);
        })
        .catch(error => {
            console.log(error);
            // add it to the log on server
        });
    }

    // makes request to backend and changes numFieldsToSync data if successful, otherwise returns and logs an error
    const getFieldsToSync = () => {
        var url = "http://127.0.0.1:5000/fields_to_sync";

        axios
        .get(url)
        .then(response => {
            console.log(response.data);
            setNumFieldsToSync(response.data["num_fields"]);
        })
        .catch(error => {
            console.log(error);
            // add it to the log on server
        });
    }

    // calls to backend made when component mounts
    useEffect(() => { 
        getPrevSyncTime();
        getFieldsToSync();
        // eslint-disable-next-line
    }, [])

    return(
        <SyncSettingsContainer
            prevSyncTime={prevSyncTime}
            timeUnit={timeUnit}
            numFieldsToSync={numFieldsToSync}
            syncInterval={syncInterval}
            setSyncInterval={setSyncInterval}
        />       
    )
}

export default SyncSettingsAPI;