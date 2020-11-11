import React, {useEffect, useState, useRef} from "react";
import Button from '@atlaskit/button';
import axios from 'axios';
import {useStoreState} from 'easy-peasy';
import {useHistory} from 'react-router-dom';
import LinkedItemsTable from '../../components/LinkedItemsTable';
import LinkFieldsTable from './LinkFieldsTable';
import makeToast from '../../components/Toaster';
import '../../styles/pages/LinkFields.style.sass';

const LinkFieldsContainer = () => {
    const devURL = "http://127.0.0.1:5000"
    const history = useHistory();
    // references to hold user input 
    const jamaFieldIDRef = useRef();
    const jiraFieldIDRef = useRef();
    const jamaFieldNameRef = useRef();
    const jiraFieldNameRef = useRef();

    // these are temporary - will be using project id, type id, and item/issue id from Yi's store and tokens from Thy's
    const jamaProjectID = 46;
    const jiraProjectID = 101; 
    const jamaTypeID = 29;
    const jiraTypeID = 27;
    const issueID = 10070;
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

    // retrieve Jama/Jira item info and token from store
    /*const { itemID, issueID, jamaItemType, jiraItemType, jamaProjectID, jiraProjectID, jamaToken } = useStoreState(
        state => ({
            itemID: state.jamaitem.itemID,
            issueID: state.jamaitem.jiraID,
            jamaToken: state.accountStore.token
        })
    )*/

    
    /* API Calls */

    // retrieves the fields of an item from the Jama database given its ID
    // sets Jama item data to link, item name, and field data
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
          console.log(response.data);
          setJamaItemName(response.data.fields.name);
          setItemData(response.data.fields);
          var jamaItemData = [itemID, response.data.fields.name, jamaTypeID, jamaProjectID];
          setJamaItemToLink(jamaItemToLink => [...jamaItemToLink, jamaItemData]);
        })
        .catch((error) => {
          console.log(error.response);
          makeToast("error", "Error retrieving Jama item by ID. Please see the error logs located in the admin settings"); 
        });
    }

    // retrieves the fields of an item from the Jira database given its ID
    // sets Jira item data to link, item name, and field data
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
          console.log(response.data);
          setJiraIssueName(response.data.fields.summary);
          setIssueData(response.data.fields);
          var jiraIssueData = [issueID, response.data.fields.summary, jiraTypeID, jiraProjectID];
          setJiraItemToLink(jiraItemToLink => [...jiraItemToLink, jiraIssueData]);
        })
        .catch(error => {
          console.log("error:", error);
          makeToast("error", "Error retrieving Jira item by ID. Please see the error logs located in the admin settings"); 
        });
    }

    // posts link data for Jama and Jira items and fields
    const linkItems = async (params) => {
        console.log(params);
        await axios({
          url: `${devURL}/link_items`,
          method: "post",
          data: params
        })
        .then(response => {
          console.log(response);
          makeToast("success", "Linking was successful!");
        })
        .catch(error => {
          console.log("error:", error);
          makeToast("error", "Error when linking. Please see the error logs located in the admin settings"); 
        })
    }

    /* useEffect hooks */
        
    // retrieves all fields for selected item and renders the table when component mounts
    useEffect(() => {
      getJamaFields(itemID);
      getJiraFields(issueID);
    },[]) 

    // add data to DOM for testing whenever new fields are added or item data is changed
    useEffect(() => {
      if(jamaFieldsToLink.length !== 0 && jiraFieldsToLink.length !== 0) {
        var testDiv = document.createElement("div");
        testDiv.id = "test_div";
        testDiv.innerHTML = `<p>Jama item to link: ${jamaItemToLink}<br> 
          Jira item to link: ${jiraItemToLink}<br>
          Jama fields to link: ${jamaFieldsToLink}<br>
          Jira fields to link: ${jiraFieldsToLink}<p>`
        document.body.appendChild(testDiv);
      }
    }, [jiraItemToLink, jamaItemToLink, jiraFieldsToLink, jamaFieldsToLink])


    /* Data transformation functions */

    // convert to form data
    const convertToForm = () => {
        var formData = new FormData();

        // add item arrays to form data
        for(let i = 0; i < jiraItemToLink[0].length && i < jamaItemToLink[0].length; i++) {
          formData.append("jira_item[]", jiraItemToLink[0][i]);
          formData.append("jama_item[]", jamaItemToLink[0][i]);
        }

        
        // add field arrays 
        for(let i = 0; i < jamaFieldsToLink.length; i++) {
          for (let j = 0; j < jamaFieldsToLink[i].length; j++) {  // this will always be 2
            formData.append(`jira_fields[${i}]`, jiraFieldsToLink[i][j]);
            formData.append(`jama_fields[${i}]`, jamaFieldsToLink[i][j]);
          }
        }
        
        // add the number of fields
        formData.append("num_fields", jamaFieldsToLink.length);
        
        /*for(var pair of formData.entries()) 
          console.log(pair[0], pair[1]);*/

        return formData;
    }


    /* Input and button functionality */ 

    const validateInput = () => {} // WIP - plan is to check that the fields supplied by user are in the retrieved data

    // handles the "add to batch" button. adds the user input to the fields array 
    const handleAdd = () => {
        var newJamaFieldID = jamaFieldIDRef.current.value;
        var newJamaFieldName = jamaFieldNameRef.current.value;;
        var newJiraFieldID = jiraFieldIDRef.current.value;;
        var newJiraFieldName = jiraFieldNameRef.current.value;;
        
        if(newJamaFieldID === "" || newJamaFieldName === "" || newJiraFieldID === "" || newJiraFieldName === "") {
            makeToast("error", "Input is required to link fields. Please enter a service ID and name."); 
            return;
        }

        // add new fields to the array
        setJamaFieldsToLink(jamaFieldsToLink => [...jamaFieldsToLink, [newJamaFieldID, newJamaFieldName]]);
        setJiraFieldsToLink(jiraFieldsToLink => [...jiraFieldsToLink, [newJiraFieldID, newJiraFieldName]]);
        
        // clear form input
        document.getElementById("input_jama_field_id").value = ""; 
        document.getElementById("input_jama_field_name").value = ""; 
        document.getElementById("input_jira_field_id").value = "";
        document.getElementById("input_jira_field_name").value = ""; 
    }

    // handles the "link" button. converts data to form and sends to the backend array of items to link
    const handleLink = (event) => {
        event.preventDefault();
        if(jiraItemToLink[0] && jamaItemToLink[0] && jiraFieldsToLink[0] && jamaFieldsToLink[0]) {
          var data = convertToForm(); // convert data to formData 
          linkItems(data);
        }
        else {
          makeToast("error", "Input is required to link fields. Please enter a service ID and name.");
        }
    }

    // handles the "done linking" button. returns user to the previous page
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
                    <span className="input_fields_container">
                      <span className="input_jama_fields">
                        <label htmlFor="input_fields" className="input_label">Jama field service ID</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_jama_field_id"
                            className="fields_to_link_input"
                            ref={jamaFieldIDRef}
                        ></input>
                        <label htmlFor="input_fields" className="input_label">Jama field name</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_jama_field_name"
                            className="fields_to_link_input"
                            ref={jamaFieldNameRef}
                        ></input>
                      </span>
                      <span className="input_jira_fields">
                        <label htmlFor="input_fields" className="input_label">Jira field service ID</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_jira_field_id"
                            className="fields_to_link_input"
                            ref={jiraFieldIDRef}
                        ></input>
                        <label htmlFor="input_fields" className="input_label">Jira field name</label>
                        <input 
                            type="text"
                            autoComplete="off"
                            id="input_jira_field_name"
                            className="fields_to_link_input"
                            ref={jiraFieldNameRef}
                        ></input>
                      </span>
                    </span>
                    <span className="link_buttons_container">
                        <Button id="add_button" className="add_button" onClick={handleAdd}>Add to batch</Button>
                        <Button id="link_button" appearance="primary" className="link_button" onClick={handleLink}>Link fields</Button>
                        <Button id="done_button" appearance="subtle" className="done_button" onClick={handleDone}>Done linking</Button>
                    </span>
                </div>
        </div>
        
    )
}

export default LinkFieldsContainer;
