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
    const issueID = 10069;
    const itemID = 7870; 

    // retrieve state and actions from LinkStore
    const { itemData, issueData } = useStoreState(
        state => ({
            //itemID: state.jamaitem.itemID,
            itemData: state.linkStore.itemData,
            issueData: state.linkStore.issueData
        })
    )
    const { getJamaFields, getJiraFields, setItemData, setIssueData } = useStoreActions(
        actions => ({
            getJamaFields: actions.linkStore.getJamaFields,
            getJiraFields: actions.linkStore.getJiraFields,
            setItemData: actions.linkStore.setItemData,
            setIssueData: actions.linkStore.setIssueData
        })
    )
        
    // retrieve all fields for item
    useEffect(() => {
        getJamaFields(itemID);
        getJiraFields(issueID);
        // eslint-disable-next-line
    },[]) 

    // handles the link button. prints to console and sends to the backend array of IDs to link
    const handleLink = (event) => {
        var fieldsToLink = []
        event.preventDefault();
        fieldsToLink.push(jamaFieldRef.current.value);
        fieldsToLink.push(jiraFieldRef.current.value);

        if(fieldsToLink[0] === "" || fieldsToLink[1] === "") 
            alert("Error: input is required to link fields.");
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
                        itemName={"JiraIssueName"}
                    />
                </div>

                <LinkFieldsTable 
                    service="Jama"
                    itemData={itemData} 
                />
                <LinkFieldsTable 
                    service="Jira"
                    itemData={issueData}
                />
                
                <div className="user_input_container">
                    <span className="input_fields">
                        <label htmlFor="input_fields" className="input_label">Jama field name</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_Jama_field"
                            className="fields_to_link_input"
                            ref={jamaFieldRef}
                        ></input>
                        <label htmlFor="input_fields" className="input_label">Jira field name</label>
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
