import React, {useEffect, useRef} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import Button from '@atlaskit/button';
import LinkedItemsTable from '../../components/LinkedItemsTable';
import LinkFieldsTable from './LinkFieldsTable';
import '../../styles/components/LinkFields.style.sass';

const LinkFieldsContainer = () => {
    // references to hold user input 
    const jamaFieldRef = useRef();
    const jiraFieldRef = useRef();
    // need to get project ids and issue id from store
    const jamaProjectID = 100;
    const jiraProjectID = 101;  
    const issueID = 46;
    // const itemID = 455; 
    
    var fieldsToLink = [];

    // retrieve state and actions from LinkStore.js
    const { itemID, itemData, responseLength } = useStoreState(
        state => ({
            itemID: state.jamaitem.itemID,
            itemData: state.linkStore.itemData,
            responseLength: state.linkStore.responseLength
        })
    )
  
    const { getFieldsOfItem } = useStoreActions(
        actions => ({
            getFieldsOfItem: actions.linkStore.getFieldsOfItem
        })
    )
        
    // retrieve all fields for item id from the capstone database 
    useEffect(() => {
        getFieldsOfItem(itemID);
        //getFieldsOfItem(issueID);
        // eslint-disable-next-line
    },[])

    // handles the link button. prints to console and sends to the backend array of IDs to link
    const handleLink = (event) => {
        event.preventDefault();
        fieldsToLink.push(jamaFieldRef.current.value);
        fieldsToLink.push(jiraFieldRef.current.value);
        console.log("fields to link: ", fieldsToLink);

        // append user input to the DOM for testing purposes
        var testDiv = document.createElement("div");
        testDiv.id = "test_div";
        testDiv.innerHTML = `<p>${fieldsToLink}<p>`
        document.body.appendChild(testDiv);

        // post to backend
    }

    // handles the done button. returns user to the issue page
    const handleDone = (event) => {
        event.preventDefault();
        console.log("return to issue page");
        // route user to issue page 
    }

    return (
        <div className="link_page_container">
            <h1 className="link_page_title">Select fields to link</h1>
                <h2 className="link_page_subtitle">You are currently viewing these items:</h2>
                <div className="linked_items_container">
                    {/* this data needs to be obtained from shared state */}
                    <LinkedItemsTable 
                        title="Jama Project"
                        projectID={jamaProjectID}
                        projectName={"selectedJamaProject"}
                        itemID={itemID}
                        itemName={"selectedJamaItem"}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={jiraProjectID}
                        projectName={"selectedJiraProject"}
                        itemID={issueID}
                        itemName={"selectedJiraItem"}
                    />
                </div>
                <div className="fields_table_container">
                    <LinkFieldsTable 
                        service="Jama" 
                        itemData={itemData}
                        responseLength={responseLength}
                    />
                    <LinkFieldsTable 
                        service="Jira" 
                    />
                </div>
                <div className="user_input_container">
                    <span className="input_fields">
                        <label htmlFor="input_fields" className="input_label">Jama field ID</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_Jama_field"
                            className="fields_to_link_input"
                            ref={jamaFieldRef}
                        ></input>
                        <label htmlFor="input_fields" className="input_label">Jira field ID</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_Jira_field"
                            className="fields_to_link_input"
                            ref={jiraFieldRef}
                        ></input>
                    </span>
                    <span className="link_buttons_container">
                        <Button id="link_button" appearance="primary" className="link_button" onClick={handleLink}>Link</Button>
                        <Button id="done_button" appearance="subtle" className="done_button" onClick={handleDone}>Done linking</Button>
                    </span>
                </div>
        </div>
        
    )
}

export default LinkFieldsContainer;
