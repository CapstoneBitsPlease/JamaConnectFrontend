import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SyncFieldsPage from './SyncFieldsPage';

const SyncFieldsAPI = () => {
    const [checkedIDs, setCheckedIDs] = useState([]);
    const [linkedData, setLinkedData] = useState([]);
    const [responseLength, setResponseLength] = useState(0);

    // GET request to sqlite database, returns fields ready to sync if successful and an error otherwise
    const getFieldsToSync = () => {
        var url = "http://127.0.0.1:5000/fields_to_sync"

        axios
        .get(url)
        .then(response => {
            console.log("success");
            console.log(response.data);
            setLinkedData(response.data["fields_to_sync"]);
            setResponseLength(response.data["num_fields"]);
        })
        .catch(error => {
            console.log(error);
            // add it to the log on server
        });
    }

    // get fields ready to sync from capstone database
    useEffect(() => {
        getFieldsToSync();
    },[])

    return(
        <SyncFieldsPage
            responseLength={responseLength}
            linkedData={linkedData}
            checkedIDs={checkedIDs}
            setCheckedIDs={setCheckedIDs}
        />

    )


}

export default SyncFieldsAPI;
