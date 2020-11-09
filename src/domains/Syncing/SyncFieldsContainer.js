import React, {useEffect} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import Button from '@atlaskit/button';
import LinkedItemsTable from '../../components/LinkedItemsTable'
import LinkedFieldsTable from './SyncFieldsTable'
import {useHistory} from 'react-router-dom';
import '../../styles/components/SyncFields.style.sass';

/* Component to render page where user can select which fields to sync from the fields currently linked  */
const SyncFieldsContainer = () => {

    const history = useHistory();
    // these are temporary - will be using project id, item/issue id from Yi's store
    const jamaProjectID = 46;
    const jiraProjectID = 101;  
    const issueID = 10069;
    const itemID = 7870; 

    // retrieve state and actions from SyncStore
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
        // eslint-disable-next-line
    },[])
    
    // handles the checkbox input, adds each ID to an array if it is checked
    const handleCheckbox = () => {   
        var checked = [];
        const checked_values = document.getElementsByName('controlled-checkbox');
        for(let i = 0; i < checked_values.length; i++) {
            if(checked_values[i].checked)
                checked.push(checked_values[i].value);
        }
        setCheckedIDs(checked);
    }

    // request to handle the synced fields - WIP
    const syncFields = () => {
        // check that the IDs of the fields ready to sync are completely loaded
        console.log(checkedIDs);

        // append checked IDs to the DOM for testing purposes
        var testDiv = document.createElement("div");
        testDiv.id = "test_div";
        testDiv.innerHTML = `<p>${checkedIDs}<p>`
        document.body.appendChild(testDiv);

        // send ids to backend to sync
    }

    // handles the sync button. syncs all checked linked fields 
    const handleSync = (event) => {
        event.preventDefault();
        syncFields();
    }

    // handles the cancel button, routes user to previous page
    const handleGoBack = (event) => {
        event.preventDefault();
        history.goBack();
    }
    
    // render the component
    return (
        <div className="sync_page_container">
            <h1 className="sync_page_title">Select fields to sync</h1>
                <h2 className="sync_page_subtitle">You are currently viewing these linked items:</h2>
                <div className="linked_items_container">
                    <LinkedItemsTable 
                        title="Jama Project"
                        projectID={jamaProjectID}
                        projectName={"JamaProjectName"}
                        itemID={itemID}
                        itemName={"JamaItemName"}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={jiraProjectID}
                        projectName={"JiraProjectName"}
                        itemID={issueID}
                        itemName={"JiraItemName"}
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