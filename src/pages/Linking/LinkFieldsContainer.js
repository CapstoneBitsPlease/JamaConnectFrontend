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
    const [jamaItemName, setJamaItemName] = useState("");
    const [jiraIssueName, setJiraIssueName] = useState("");
    const [jiraProjectID, setJiraProjectID] = useState(0);
    const [jiraTypeName, setJiraTypeName] = useState(0);
    const [jiraProjectName, setJiraProjectName] = useState("");
    const [itemData, setItemData] = useState([]);
    const [issueData, setIssueData] = useState([]);
    const [jamaBatch, setJamaBatch] = useState([]);
    const [jiraBatch, setJiraBatch] = useState([]);
    const [jamaFieldsToLink, setJamaFieldsToLink] = useState([]);
    const [jiraFieldsToLink, setJiraFieldsToLink] = useState([]);
    const [jamaItemToLink, setJamaItemToLink] = useState([]);
    const [jiraItemToLink, setJiraItemToLink] = useState([]);

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
    const selectItemPageLocked = useStoreActions(actions => actions.jamaitem.checklinkingpage);

  
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
          setJiraTypeName(response.data.fields.issuetype.name);
          setJiraProjectID(response.data.fields.project.id);
          setJiraProjectName(response.data.fields.project.name);
          setIssueData(response.data.fields);
          var jiraIssueData = [issueID, response.data.fields.summary, response.data.fields.issuetype.name, response.data.fields.project.id];
          setJiraItemToLink(jiraItemToLink => [...jiraItemToLink, jiraIssueData]);
        })
        .catch(error => {
          console.log("error:", error);
        });
    }

    // posts link data for Jama and Jira items and fields
    const linkItems = (params) => {
        axios({
          url: `${devURL}/link_items`,
          method: "post",
          data: params,
          /*headers: {
            "Authorization": `Bearer ${token}`
          }*/
        })
        .then(() => {
          makeToast("success", "Linking was successful!");
        })
        .catch(() => {
          makeToast("error", "Error when linking. You may be trying to add a duplicate item to the database. Please see the error logs located in the admin settings."); 
        })
    }

    /* useEffect hooks */
        
    // retrieves all fields for selected item and renders the table when component mounts
    useEffect(() => {
      getJamaFields(itemID);
      getJiraFields(issueID);
      selectItemPageLocked(false);
      // eslint-disable-next-line
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
          New Jama fields to link: ${jamaFieldsToLink}<br>
          New Jira fields to link: ${jiraFieldsToLink}<br>
          Total Jama fields to link: ${jamaBatch}<br>
          Total Jira fields to link: ${jiraBatch}<p>`
        document.body.appendChild(testDiv);
      }
    }, [jamaBatch, jiraBatch, jiraItemToLink, jamaItemToLink, jiraFieldsToLink, jamaFieldsToLink])


    /* Data transformation functions */

    // generate FormData object from item data 
    const convertToForm = (jiraItem, jamaItem, jiraFields, jamaFields) => {
        var formData = new FormData();

        // add item arrays to form data
        for(let i = 0; i < jiraItem[0].length && i < jamaItem[0].length; i++) {
          formData.append("jira_item[]", jiraItem[0][i]);
          formData.append("jama_item[]", jamaItem[0][i]);
        }

        // add field arrays 
        for(let i = 0; i < jamaFields.length; i++) {
          for (let j = 0; j < jamaFields[0][0].length; j++) {  
            formData.append(`jira_fields[${i}]`, jiraFields[i][0][j]);
            formData.append(`jama_fields[${i}]`, jamaFields[i][0][j]);
          }
        }
        
        // add the number of fields
        formData.append("num_fields", jamaFields.length);

        return formData;
    }


    /* Input and button functionality */

    // handles the "add to batch" button. adds each set of fields to the total fields and disables the corresponding buttons
    const handleAdd = () => {
        if(jiraItemToLink[0] && jamaItemToLink[0] && jiraFieldsToLink[0] && jamaFieldsToLink[0] 
          && jiraFieldsToLink.length === jamaFieldsToLink.length) {
            // add to total fields
            setJiraBatch(jiraBatch => [...jiraBatch, jiraFieldsToLink]);
            setJamaBatch(jamaBatch => [...jamaBatch, jamaFieldsToLink]);

            // disable the buttons that are checked
            var jamaChecked = document.getElementsByName('jama_radio');
            var jiraChecked = document.getElementsByName('jira_radio');
            for(let i = 0; i < jamaChecked.length && i < jiraChecked.length; i++) {
                if(jamaChecked[i].checked) {
                  jamaChecked[i].disabled = true;
                }
                if(jiraChecked[i].checked) {
                  jiraChecked[i].disabled = true;
                }
            }
        }
        else {
          makeToast("error", "Input is required to add fields to be linked. Please select one field from each table.");
        }
    }

    // handles the "link fields" button. converts data to form and sends to the backend array of items and fields to link
    const handleLink = () => {
        if(jiraItemToLink[0] && jamaItemToLink[0] && jiraBatch[0] && jamaBatch[0] 
          && jiraBatch.length === jamaBatch.length) {

          // convert body to FormData for request
          var data = convertToForm(jiraItemToLink, jamaItemToLink, jiraBatch, jamaBatch);   

          // POST to capstone database
          linkItems(data);

          // uncheck and enable radios
          const jiraChecked = document.getElementsByName('jira_radio');
          const jamaChecked = document.getElementsByName('jama_radio');
          for(let i = 0; i < jiraChecked.length && i < jamaChecked.length; i++) {
              jiraChecked[i].checked = false;
              jamaChecked[i].checked = false;
              jiraChecked[i].disabled = false;
              jamaChecked[i].disabled = false;
          }
              
          // remove test divs
          if(document.getElementById("test_div")) {
            var testDiv = document.getElementById("test_div");
            testDiv.remove();
          }

          // go back to selectItem page after a couple seconds so user isn't tempted to link fields from the same item
          setTimeout(function() {history.push('/selectItem')}, 2000);
        }
        else {
          makeToast("error", "Input is required to link fields. Please select one field from each table.");
        }
    }

    // handles the "done linking" button. removes test divs, unchecks radios, and returns user to selectItem page 
    const handleDone = () => {
        // remove test divs
        if(document.getElementById("test_div")) {
          var testDiv = document.getElementById("test_div");
          testDiv.remove();
        }

        // uncheck and enable radios
        const jiraChecked = document.getElementsByName('jira_radio');
        const jamaChecked = document.getElementsByName('jama_radio');
        for(let i = 0; i < jiraChecked.length && i < jamaChecked.length; i++) {
            jiraChecked[i].checked = false;
            jamaChecked[i].checked = false;
            jiraChecked[i].disabled = false;
            jamaChecked[i].disabled = false;
        }

        // go back to selectItem page 
        history.push('/selectItem');
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
                        <Button id="add_button" className="add_button" onClick={handleAdd}>Add to batch</Button>
                        <Button id="button_link" appearance="primary" className="button_link" onClick={handleLink}>Link fields</Button>
                        <Button id="done_button" className="done_button" onClick={handleDone}>Done linking</Button>
                    </span>
                </div>
        </div>
        
    )
}

export default LinkFieldsContainer;
