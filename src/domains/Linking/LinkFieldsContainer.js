import React, {useEffect, useRef} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import axios from "axios";
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
    const issueID = 100001;
    const itemID = 455; 

    // retrieve state and actions from LinkStore
    const { itemData, issueData } = useStoreState(
        state => ({
           // itemID: state.jamaitem.itemID,
            itemData: state.linkStore.itemData,
            issueData: state.linkStore.issueData
        })
    )
    const { getFieldsOfItem } = useStoreActions(
        actions => ({
            getFieldsOfItem: actions.linkStore.getFieldsOfItem
        })
    )

    const getProjects = () => {
        const token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDQ2ODc0ODQsIm5iZiI6MTYwNDY4NzQ4NCwianRpIjoiMTdkYmViMTQtMTExYS00ZjhiLTllYzYtNmI3ZTA1MjFjMzBhIiwiZXhwIjoxNjA0Njg4Mzg0LCJpZGVudGl0eSI6eyJjb25uZWN0aW9uX2lkIjoiZDMxMGY4YzYtZTYxNy00YzQxLWIzZDAtYjdhYWFhZjc1OTM1In0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.jAuQIAIW8ylph9zdXtM--94oVcbD3wk1JLnQCalVgB8";
        axios({
            method: "get",
            url: "http://127.0.0.1:5000/jama/item_by_id?item_id=7870",
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log("error: ", error.response);
          // alert("Error retrieving item fields from backend");
          });
    }
        
    // retrieve all fields for Jama item id from the capstone database 
    useEffect(() => {
     //   getFieldsOfItem(itemID);
     //   getFieldsOfItem(issueID);
        getProjects();
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