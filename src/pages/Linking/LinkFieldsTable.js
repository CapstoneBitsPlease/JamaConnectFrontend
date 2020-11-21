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
            if(typeof key[1] !== 'object' && key[1] !== "[]" && key[1] !== "{}" && key[1] !== null 
            && !key[0].includes("customfield_10019") && !key[0].includes("customfield_10025")) {  // customfield_10019 = "i|1009:"" and customfield_10025 = "10000_*:*_1_*:*_174049426_*|*_10002_*:*_1_*:*_0_*|*_10004_*:*_1_*:*_1640872045_*|*_10003_*:*_1_*:*_605197033" so ... ¯\_(ツ)_/¯
                if(!key[0].includes("$") && !key[0].includes("_")) {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        // adds a space before uppercase letters if in camelCase
                        "fieldName": key[0].replace((/([^A-Z](?=[A-Z]))/g), "$1 ").toLowerCase()
                    })
                }
                // we know this field is story points 
                else if(key[0].includes("customfield_10016")) {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].replace("customfield_10016", "story points")
                    })
                }
                // Spencer specifically set this field to be the Jama URL 
                else if(key[0].includes("customfield_10029")) {
                    formattedData.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].replace("customfield_10029", "Jama URL")
                    })
                }
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