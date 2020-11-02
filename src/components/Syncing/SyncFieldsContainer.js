import React, {useEffect} from 'react';
import Button from '@atlaskit/button';
import LinkedItemsTable from './LinkedItemsTable'
import LinkedFieldsTable from './LinkedFieldsTable'
import {useStoreActions, useStoreState} from "easy-peasy";
import '../../styles/components/SyncFields.style.sass';

/* Component to render page where user can select which fields to sync from the fields currently linked  */
const SyncFieldsContainer = () => {

    const { linkedData, responseLength, checkedIDs } = useStoreState(
        state => ({
            linkedData: state.syncStore.linkedData,
            responseLength: state.syncStore.responseLength,
            checkedIDs: state.syncStore.checkedIDs
        })
    )
  
    const { getFieldsToSync, setCheckedIDs } = useStoreActions(
        actions => ({
            getFieldsToSync: actions.syncStore.getFieldsToSync,
            setCheckedIDs: actions.syncStore.setCheckedIDs
        })
    )

    // get fields ready to sync from capstone database
    useEffect(() => {
        getFieldsToSync();
    },[])
    
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
    
    // render the component
    return (
        <div className="sync_page_container">
            <h1 className="sync_page_title">Select fields to sync</h1>
                <h2 className="sync_page_subtitle">You are currently viewing these linked items:</h2>
                <div className="linked_items_container">
                    {/* this data needs to be obtained from shared state */}
                    <LinkedItemsTable 
                        title="Jama Project"
                        projectID={"selectedJamaProject"}
                        projectName={"selectedJamaProject"}
                        itemID={"selectedJamaItem"}
                        itemName={"selectedJamaItem"}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={"selectedJiraProject"}
                        projectName={"selectedJiraProject"}
                        itemID={"selectedJiraItem"}
                        itemName={"selectedJiraItem"}
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
                    <Button id="sync_button" appearance="primary" className="sync_button" onClick={handleSync}>Sync selected</Button>
                    <Button id="go_back_button" appearance="subtle" className="go_back_button" onClick={handleGoBack}>Go back</Button>
                </span>
        </div>
);

}

export default SyncFieldsContainer;