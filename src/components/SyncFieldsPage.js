import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import LinkedItemsTable from 'components/LinkedItemsTable.js'
import LinkedFieldsTable from 'components/LinkedFieldsTable.js'
import '../styles/components/SyncFields.style.sass';

/* Component to render page where user can select which fields to sync from the fields currently linked  */
const SyncFieldsPage = (props) => {
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
    
    // handles the checkbox input, adds each ID to an array if it is checked
    const handleCheckbox = (event) => {   
        const { type } = event.target;
        var checked = [];
        var checked_value = 0;
        if(type === 'checkbox') {
            const checked_values = document.getElementsByName('controlled-checkbox');
            for(let i = 0; i < checked_values.length; i++) {
                if(checked_values[i].checked)
                    checked.push(checked_values[i].value);
            }
            checked_value = checked;
            setCheckedIDs(checked_value);
        }
    }

    // request to handle the synced fields
    const sync_fields = () => {
        // check that the IDs of the fields ready to sync are completely loaded
        console.log(checkedIDs);
    }

    // handles the sync button. syncs all checked linked fields 
    const handleSync = (event) => {
        event.preventDefault();
        console.log("syncing");
        sync_fields();
    }

    // handles the cancel button
    const handleGoBack = (event) => {
        event.preventDefault();
        console.log("cancelling");
    }

    // get fields ready to sync from capstone database
    useEffect(() => {
        getFieldsToSync();
    },[])
    
    // render the component
    return (
        <div className="sync_page_container">
            <h1 className="sync_page_title">Select fields to sync</h1>
                <h2 className="sync_page_subtitle">You are currently viewing these linked items:</h2>
                <div className="linked_items_container">
                    <LinkedItemsTable 
                        title="Jama Project"
                        projectID={"selectedProject"}
                        projectName={"selectedProject"}
                        itemID={"selectedItem"}
                        itemName={"selectedItem"}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={"selectedProject"}
                        projectName={"selectedProject"}
                        itemID={"selectedItem"}
                        itemName={"selectedItem"}
                    />
                </div>
                <div className="linked_fields_container">
                    <LinkedFieldsTable
                        responseLength={responseLength}
                        linkedData={linkedData}
                        handleCheckbox={handleCheckbox}
                    />
                </div>
                <span className="button_container">
                    <Button appearance="primary" className="sync_button" onClick={handleSync}>Sync selected</Button>
                    <Button appearance="subtle" className="go_back_button" onClick={handleGoBack}>Go back</Button>
                </span>
        </div>
);

}

export default SyncFieldsPage;