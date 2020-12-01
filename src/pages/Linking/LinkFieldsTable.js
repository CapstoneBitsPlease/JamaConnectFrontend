import React from "react";

const LinkFieldsTable = (props) => {

    // handles the radio button input. adds formatted array of service ID and name to another array if it is checked
    const handleRadio = () => {
        var radioValues = [];
        var radioData = [];
        
        // determine which table we are handling 
        if(props.service === "Jama") 
            radioValues = document.getElementsByName('jama_radio');
        if(props.service === "Jira") 
            radioValues = document.getElementsByName('jira_radio');

        // add the checked value to an array 
        for(let i = 0; i < radioValues.length; i++) {
            if(radioValues[i].checked) {
                radioData.push(radioValues[i].value);
            }
        }

        var fieldData = [];

        // format the data and add to new array for linking
        for(let i = 0; i < radioData.length; i++) {
            let fieldServiceID = radioData[i].split(",")[0];
            let fieldName = radioData[i].split(",")[1];
            fieldData.push([fieldServiceID, fieldName]);
        }

        if(props.service === "Jama") {
            props.setJamaFieldsToLink(fieldData);
        }
        else if(props.service === "Jira") {
            props.setJiraFieldsToLink(fieldData);
        }   
    }
    

    // format data for UI. **excludes any nested subfields 
    const formatData = (itemData) => {
        var formattedData = [];
        var i = 0;

        // parse/replace for a more readable field name. add index, service ID and name 
        Object.entries(itemData).forEach((key) => {
            // not looking at Jira's nested fields 
            if(typeof key[1] !== 'object' 
            // making sure it's not empty 
            && key[1] !== "[]" && key[1] !== "{}" && key[1] !== null 
            // not sure how to name the kind of data these fields are holding 
            && !key[0].includes("customfield_10019") 
            && !key[0].includes("customfield_10025") 
            // these are read-only fields and cannot be linked
            && !key[0].includes("globalId")
            && !key[0].includes("documentKey")) {  

                // handle camelCase
                if(!key[0].includes("$") && !key[0].includes("_")) {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].replace((/([^A-Z](?=[A-Z]))/g), "$1 ").toLowerCase()
                    })
                }
                // this field is story points 
                else if(key[0].includes("customfield_10016")) {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].replace("customfield_10016", "story points")
                    })
                }
                // this field was specifically set to be the Jama URL 
                else if(key[0].includes("customfield_10029")) {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].replace("customfield_10029", "Jama URL")
                    })
                }
                // base case (only $ and _ to replace)
                else {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].split('$')[0].replaceAll("_", " ")
                    })
                }
                i += 1;
            }
        })
        return formattedData;
    }

    // add the table of fields from the formatted data to the DOM
    const renderTable = () => {
        var data = formatData(props.itemData);
        var radioName = (props.service === "Jama") ? "jama_radio" : "jira_radio";

        // map each data point and a radio button to a new row in the table
        return data.map((row) => {
            const { index, fieldServiceID, fieldName, checked } = row;
            var fieldData = [fieldServiceID, fieldName];
            return (    
                <tr className="linked_fields_row" key={index}>
                    <td id="field_index" className="link_fields_data">{index}</td>
                    <td id="field_service_id" className="link_fields_data">{fieldServiceID}</td>
                    <td id="field_name" className="link_fields_data">{fieldName}</td>
                    <td className="link_fields_data">
                    <div className="link_fields_radio">
                        <input
                            type="radio"
                            id={`${radioName}_${index}`}
                            onChange={handleRadio}
                            value={fieldData}
                            name={radioName}
                            checked={checked}
                            className="link_radio"
                        ></input>
                    </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="link_fields_table_container">
            <h3 className="link_fields_table_title">{props.service} Fields</h3>
            <table className="link_fields_table">
                <thead>
                    <tr className="link_fields_row">
                        <th className="link_fields_headers">No.</th>
                        <th className="link_fields_headers">Field Service ID</th>
                        <th className="link_fields_headers">Field Name</th>
                        <th className="link_fields_headers">Link</th>
                    </tr>
                </thead>
                <tbody>
                   {renderTable()}
                </tbody>
            </table>
        </div>
    )

}

export default LinkFieldsTable;