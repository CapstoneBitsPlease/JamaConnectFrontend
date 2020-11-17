import React, {useEffect, useState} from "react";
import Button from '@atlaskit/button';
import axios from 'axios';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {useHistory} from 'react-router-dom';
import ItemsTable from '../../components/ItemsTable';
import LinkFieldsTable from './LinkFieldsTable';
import makeToast from '../../components/Toaster';
import '../../styles/pages/LinkFields.style.sass';

const LinkFieldsContainer = () => {
    const devURL = "http://127.0.0.1:5000";
    const history = useHistory();
    
    // initial component state 
    const [ jamaItemName, setJamaItemName ] = useState("");
    const [ jiraIssueName, setJiraIssueName ] = useState("");
    const [ jiraProjectID, setJiraProjectID ] = useState(0);
    const [ jiraTypeID, setJiraTypeID ] = useState(0);
    const [ jiraProjectName, setJiraProjectName ] = useState("");
    const [ itemData, setItemData ] = useState([]);
    const [ issueData, setIssueData ] = useState([]);
    const [ jamaFieldsToLink, setJamaFieldsToLink ] = useState([]);
    const [ jiraFieldsToLink, setJiraFieldsToLink ] = useState([]);
    const [ jamaItemToLink, setJamaItemToLink ] = useState([]);
    const [ jiraItemToLink, setJiraItemToLink ] = useState([]);

    // retrieve Jama/Jira item info and token from store
    const { itemID, jamaItemType, jamaProjectID, jamaProjectName, issueID, token } = useStoreState(
        state => ({
            itemID: state.jamaitem.itemID,
            jamaItemType: state.jamaitem.itemtype,
            jamaProjectID: state.jamaitem.progID,
            jamaProjectName: state.jamaitem.progname,
            issueID: state.jamaitem.jiraID,
            token: state.accountStore.token
        })
    )
    const currentActivePage = useStoreActions(actions => actions.jamaitem.checklinkingpage);

  
    /* API Calls */

    // retrieves the fields of an item from the Jama database given its ID
    // sets Jama item data to link, item name, and field data
    const getJamaFields = (itemID) => {
        axios
        .get(
          `${devURL}/jama/item_by_id?item_id=${itemID}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
          console.log("jama/item_by_id success");
          console.log(response.data);
          setJamaItemName(response.data.fields.name);
          setItemData(response.data.fields);
          var jamaItemData = [itemID, response.data.fields.name, jamaItemType, jamaProjectID];
          setJamaItemToLink(jamaItemToLink => [...jamaItemToLink, jamaItemData]);
        })
        .catch((error) => {
          console.log(error.response);
          makeToast("error", "Error retrieving Jama item by that ID. Please see the error logs located in the admin settings."); 
        });
    }

    // retrieves the fields of an item from the Jira database given its ID
    // sets Jira item data to link, item name, and field data
    const getJiraFields = (issueID) => {
        axios
        .get(
          `${devURL}/jira/item_by_id?id=${issueID}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        )
        .then(response => {
          console.log("jira/item_of_id success");
          console.log(response.data);
          setJiraIssueName(response.data.fields.summary);
          setJiraTypeID(response.data.fields.issuetype.id);
          setJiraProjectID(response.data.fields.project.id);
          setJiraProjectName(response.data.fields.project.name);
          setIssueData(response.data.fields);
          var jiraIssueData = [issueID, response.data.fields.summary, response.data.fields.issuetype.id, response.data.fields.project.id];
          setJiraItemToLink(jiraItemToLink => [...jiraItemToLink, jiraIssueData]);
        })
        .catch(error => {
          console.log("error:", error);
          makeToast("error", "Error retrieving Jira item by that ID. Please see the error logs located in the admin settings."); 
        });
    }

    // posts link data for Jama and Jira items and fields
    const linkItems = (params) => {
        console.log(params);
        axios({
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
          makeToast("error", "Error when linking. You may be trying to add a duplicate item to the database. Please see the error logs located in the admin settings."); 
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
      if(jamaFieldsToLink.length !== 0 || jiraFieldsToLink.length !== 0) {
        if(document.getElementById("test_div")) {
          var testDiv = document.getElementById("test_div");
          testDiv.remove();
        }
        testDiv = document.createElement("div");
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

        return formData;
    }


    /* Input and button functionality */
    

    // handles the "link" button. converts data to form and sends to the backend array of items and fields to link
    const handleLink = (event) => {
        event.preventDefault();
        if(jiraItemToLink[0] && jamaItemToLink[0] && jiraFieldsToLink[0] && jamaFieldsToLink[0] 
          && jiraFieldsToLink.length === jamaFieldsToLink.length) {

          // convert to formData for request
          var data = convertToForm();   

          // POST to capstone database
          linkItems(data);

          // uncheck checkboxes
          const jiraChecked = document.getElementsByName('jira_checkbox');
          const jamaChecked = document.getElementsByName('jama_checkbox');
          for(let i = 0; i < jiraChecked.length && i < jamaChecked.length; i++) {
              jiraChecked[i].checked = false;
              jamaChecked[i].checked = false;
          }
              
          // remove test divs
          if(document.getElementById("test_div")) {
            var testDiv = document.getElementById("test_div");
            testDiv.remove();
          }

          // go back to previous page so user isn't tempted to link fields from the same item
          currentActivePage(false);
          history.push('/selectItem');
        }
        else {
          makeToast("error", "Input is required to link fields. Please select an equal number of fields from each table.");
        }
    }

    return (
        <div className="link_page_container">
            <h1 className="link_page_title">Select fields to link</h1>
                <h2 className="link_page_subtitle">You are currently viewing these items:</h2>
                <div className="linked_items_container">
                    <ItemsTable 
                        title="Jama Project"
                        projectID={jamaProjectID}
                        projectName={jamaProjectName}
                        itemID={itemID}
                        itemName={jamaItemName}
                    />
                    <ItemsTable 
                        title="Jira Project"
                        projectID={jiraProjectID}
                        projectName={jiraProjectName}
                        itemID={issueID}
                        itemName={jiraIssueName}
                    />
                </div>
                <LinkFieldsTable 
                    service="Jama"
                    itemData={itemData} 
                    setJamaFieldsToLink={setJamaFieldsToLink}
                    setJiraFieldsToLink={setJiraFieldsToLink}
                />
                <LinkFieldsTable 
                    service="Jira"
                    itemData={issueData}
                    setJamaFieldsToLink={setJamaFieldsToLink}
                    setJiraFieldsToLink={setJiraFieldsToLink}
                />
                <div className="user_input_container">
                    <span className="button_container">
                        <Button id="button_link" appearance="primary" className="button_link" onClick={handleLink}>Link fields</Button>
                    </span>
                </div>
        </div>
        
    )
}

export default LinkFieldsContainer;
