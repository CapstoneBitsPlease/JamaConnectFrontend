import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import {Checkbox} from '@atlaskit/checkbox';
import LinkedItemsTable from 'components/LinkedItemsTable.js'
import '../styles/components/SyncFields.style.sass';

/* Component to render page where user can select which fields to sync from the fields currently linked  */
const SyncFieldsPage = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkedIDs, setCheckedIDs] = useState([]);
    const [linkedData, setLinkedData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [responseLength, setResponseLength] = useState(0);
    const token = process.env.token;

    // post creds to retrieve jwt to make other calls 
    const login = () => {
        var url = 'http://127.0.0.1:5000/login/jama/basic?username=user&password=pass&organization=org';

        axios
        .post(url)
        .then(response => {
            console.log("success");
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            // add it to the log on server
        });
    }

    // GET request to sqlite database, returns fields ready to sync if successful and an error otherwise
    const getLinkedFields = () => {
        var url = "http://127.0.0.1:5000/fields_to_sync"

        axios
        .get(url, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
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

    // strip from the response only the data we need for the fields table
    const formatDataForTable = () => {
        var newJamaNames = [];
        var newJiraNames = [];
        var data = [];
        for(let i=0; i < responseLength; i++) {
            for(let j=0; j < 5; j++) {
                if(j === 3)
                    newJamaNames.push(linkedData[i][j]);
                if(j === 4)
                    newJiraNames.push(linkedData[i][j]);
            }
        }
        for(let i=0; i < responseLength; i++){
            data.push({
                "id": i+1, 
                "jamaName": newJamaNames[i], 
                "jiraName": newJiraNames[i],
                "isChecked": false
            })
        }
        return data;
    }

    // format data and add it to the DOM
    const renderTableData = () => {
        var data = formatDataForTable();
        return data.map((row, index) => {
            const { id, jamaName, jiraName, checked } = row;
            return (    
                <tr className="linked_fields_row" key={id}>
                    <td className="linked_fields_data">{id}</td>
                    <td className="linked_fields_data">{jamaName}</td>
                    <td className="linked_fields_data">{jiraName}</td>
                    <td className="linked_fields_data">
                        <div className="linked_fields_checkbox">
                            <Checkbox
                                isChecked={checked}
                                onChange={handleCheckbox}
                                value={id}
                                name="controlled-checkbox"
                            />
                        </div>
                    </td>
                </tr>
            )
        })
    }
    
    // handles the checkbox input
    const handleCheckbox = (event) => {   
        var data = tableData;
        data.forEach(row => {
            if(data["id"] === event.target.value) {
                data.checked = event.target.checked;
                console.log("data.checked", data.checked)
            }
        })
        setTableData(data);
    }

    // handles the sync button. syncs all checked linked fields 
    const handleSync = (event) => {
        event.preventDefault();
        console.log("syncing");
        login(); // only here during development
    }

    // handles the cancel button
    const handleGoBack = (event) => {
        event.preventDefault();
        console.log("cancelling");
    }

    // get linked fields from sqlite database
    useEffect(() => {
        getLinkedFields();
    },[])
    
    // render the component
    return (
        <div>
            <h1 className="sync_page_title">Jama-Jira link information</h1>
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
                    <table className="linked_fields_table">
                        <thead>
                            <tr>
                                <th className="linked_fields_title">Linked fields</th>
                            </tr>
                            <tr className="linked_fields_row">
                                <th className="linked_fields_headers">ID</th>
                                <th className="linked_fields_headers">Jama Name</th>
                                <th className="linked_fields_headers">Jira Name</th>
                                <th className="linked_fields_headers">Sync</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableData()}
                        </tbody>
                    </table>
                    <Button appearance="primary" className="sync_button" onClick={handleSync}>Sync selected</Button>
                    <Button appearance="subtle" className="go_back_button" onClick={handleGoBack}>Go back</Button>
                </div>
        </div>
);

}

export default SyncFieldsPage;