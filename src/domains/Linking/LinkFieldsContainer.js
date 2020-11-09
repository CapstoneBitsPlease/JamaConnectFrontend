import React, {useEffect, useState, useRef} from "react";
import Button from '@atlaskit/button';
import axios from 'axios';
import {useStoreState} from 'easy-peasy';
import {useHistory} from 'react-router-dom';
import LinkedItemsTable from '../../components/LinkedItemsTable';
import LinkFieldsTable from './LinkFieldsTable';
import '../../styles/components/LinkFields.style.sass';

const LinkFieldsContainer = () => {
    const devURL = "http://127.0.0.1:5000"
    const history = useHistory();
    // references to hold user input 
    const jamaFieldRef = useRef();
    const jiraFieldRef = useRef();

    // these are temporary - will be using project id, type id, and item/issue id from Yi's store and tokens from Thy's
    const jamaProjectID = 46;
    const jiraProjectID = 101;  
    const jamaTypeID = 29;
    const jiraTypeID = 27;
    const issueID = 10069;
    const itemID = 7870; 
    const jamaToken = "";
    const jiraToken = "";
    
    // initial component state 
    const [ jamaItemName, setJamaItemName ] = useState("");
    const [ jiraIssueName, setJiraIssueName ] = useState("");
    const [ itemData, setItemData ] = useState([]);
    const [ issueData, setIssueData ] = useState([]);
    const [ jamaFieldsToLink, setJamaFieldsToLink ] = useState([]);
    const [ jiraFieldsToLink, setJiraFieldsToLink ] = useState([]);
    const [ jamaItemToLink, setJamaItemToLink ] = useState([]);
    const [ jiraItemToLink, setJiraItemToLink ] = useState([]);

    // retrieve Jama/Jira item info from store
    /*const { itemID, issueID, jamaItemType, jiraItemType, jamaProjectID, jiraProjectID } = useStoreState(
        state => ({
            itemID: state.jamaitem.itemID,
        })
    )*/

    
    /* API Calls */

    // API call to retrieve the fields of an item from the Jama database given its ID
    const getJamaFields = async(itemID) => {
        await axios
        .get(
          `${devURL}/jama/item_by_id?item_id=${itemID}`, {
            headers: {
              "Authorization": `Bearer ${jamaToken}`
            }
        })
        .then(response => {
          console.log("jama/item_by_id success");
          console.log(response.data.fields);
          setJamaItemName(response.data.fields.name);
          setItemData(response.data.fields);
          var jamaItemData = [itemID, response.data.fields.name, jamaTypeID, jamaProjectID];
          setJamaItemToLink(jamaItemToLink => [...jamaItemToLink, jamaItemData]);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    // API call to retrieve the fields of an item from the Jira database given its ID
    const getJiraFields = async(issueID) => {
        await axios
        .get(
          `${devURL}/jira/item_by_id?id=${issueID}`, {
            headers: {
              "Authorization": `Bearer ${jiraToken}`
            }
          }
        )
        .then(response => {
          console.log("jira/item_of_id success");
          console.log(response.data.fields);
          setJiraIssueName(response.data.fields.summary);
          setIssueData(response.data.fields);
          var jiraIssueData = [issueID, response.data.fields.summary, jiraTypeID, jiraProjectID];
          setJiraItemToLink(jiraItemToLink => [...jiraItemToLink, jiraIssueData]);
        })
        .catch(error => {
          console.log("error:", error);
        });
    }

    // API call to link fields of a Jama item and a Jira issue - WIP
    const linkItems = async (params) => {
        console.log(params);
        await axios({
          url: `${devURL}/link_items`,
          method: "post",
          data: params
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log("error: ", error);
        })
    }


    /* useEffect hooks */
        
    // retrieve all fields for item
    useEffect(() => {
      if(jamaToken) {
        getJamaFields(itemID);
        getJiraFields(issueID);
      }
    },[jamaToken]) 

    // add data to DOM for testing whenever new fields are added 
    useEffect(() => {
      if(jamaItemToLink.length !== 0 && jiraItemToLink.length !== 0) {
        var testDiv = document.createElement("div");
        testDiv.id = "test_div";
        testDiv.innerHTML = `<p>Jama item to link: ${jamaItemToLink}<br> 
          Jira item to link: ${jiraItemToLink}<br>
          Jama fields to link: ${jamaFieldsToLink}<br>
          Jira fields to link: ${jiraFieldsToLink}<p>`
        document.body.appendChild(testDiv);
      }
    }, [jiraItemToLink, jamaItemToLink, jiraFieldsToLink, jamaFieldsToLink])


    /* Utility functions to transform the data */

    // convert to form data
    const convertToForm = () => {
        var formData = new FormData();

        // add item arrays to form data
        for(let i = 0; i < jiraItemToLink[0].length; i++) {
          console.log("appending to form:", jiraItemToLink[0][i]);
          formData.append("jira_item[]", jiraItemToLink[0][i]);
        }
        for(let i = 0; i < jamaItemToLink[0].length; i++) {
          console.log("appending to form:", jamaItemToLink[0][i]);
          formData.append("jama_item[]", jamaItemToLink[0][i]);
        }

        // add field arrays 
        for(let i = 0; i < jiraFieldsToLink.length; i++) {
          console.log("appending to form:", jiraFieldsToLink[i]);
          formData.append("jira_fields[]", jiraFieldsToLink[i]);
        }
        for(let i = 0; i < jamaFieldsToLink.length; i++) {
          console.log("appending to form:", jamaFieldsToLink[i]);
          formData.append("jama_fields[]", jamaFieldsToLink[i]);
        }

        // add the number of fields
        formData.append("num_fields", jiraFieldsToLink.length + jamaFieldsToLink.length);
        
        // check out the form data 
        for(var pair of formData.entries()) 
          console.log(pair[0], pair[1]);

        return formData;
    }


    /* Input and button functionality */ 

    const validateInput = () => {} // WIP - plan is to check that the fields supplied by user are in the retrieved data

    // handles the "add to batch" button. adds the user input to the fields array 
    const handleAdd = () => {
        var newJamaFieldsToLink = "";
        var newJiraFieldsToLink = "";
        newJamaFieldsToLink = jamaFieldRef.current.value;
        newJiraFieldsToLink = jiraFieldRef.current.value;
        
        if(newJamaFieldsToLink === "" || newJiraFieldsToLink === "") {
            alert("Error: input is required to link fields.");
            return;
        }

        setJamaFieldsToLink(jamaFieldsToLink => [...jamaFieldsToLink, newJamaFieldsToLink]);
        setJiraFieldsToLink(jiraFieldsToLink => [...jiraFieldsToLink, newJiraFieldsToLink]);

        // clear form input
        document.getElementById("input_jama_field").value = ""; 
        document.getElementById("input_jira_field").value = "";
    }

    // handles the link button. converts data to form and sends to the backend array of items to link - WIP
    const handleLink = (event) => {
        event.preventDefault();
        if(jiraItemToLink[0] && jamaItemToLink[0] && jiraFieldsToLink[0] && jamaFieldsToLink[0]) {
          var data = convertToForm(); // convert data to formData 
          linkItems(data); // post to backend
        }
    }

    // handles the done button. returns user to the previous page
    const handleDone = (event) => {
        event.preventDefault();
        history.goBack();
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
                        itemName={jamaItemName}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={jiraProjectID}
                        projectName={"JiraProjectName"}
                        itemID={issueID}
                        itemName={jiraIssueName}
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
                            id="input_jama_field"
                            className="fields_to_link_input"
                            ref={jamaFieldRef}
                        ></input>
                        <label htmlFor="input_fields" className="input_label">Jira field name</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_jira_field"
                            className="fields_to_link_input"
                            ref={jiraFieldRef}
                        ></input>
                    </span>
                    <span className="link_buttons_container">
                        <Button id="add_button" className="add_button" onClick={handleAdd}>Add to batch</Button><br/>
                        <Button id="link_button" appearance="primary" className="link_button" onClick={handleLink}>Link fields</Button>
                        <Button id="done_button" appearance="subtle" className="done_button" onClick={handleDone}>Done linking</Button>
                    </span>
                </div>
        </div>
        
    )
}

export default LinkFieldsContainer;
