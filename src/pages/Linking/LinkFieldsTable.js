import React from "react";

const LinkFieldsTable = (props) => {

    // handles the checkbox input. adds each service ID and name to an array if it is checked
    const handleCheckbox = () => {
        var checkboxValues = [];
        var checkboxData = [];
        var fieldData = [];
        
        if(props.service === "Jama") 
            checkboxValues = document.getElementsByName('jama_checkbox');
        if(props.service === "Jira") 
            checkboxValues = document.getElementsByName('jira_checkbox');

        for(let i = 0; i < checkboxValues.length; i++) {
            if(checkboxValues[i].checked) {
                checkboxData.push(checkboxValues[i].value);
            }
        }

        for(let i = 0; i < checkboxData.length; i++) {
            // split the data 
            let fieldServiceID = checkboxData[i].split(",")[0];
            let fieldName = checkboxData[i].split(",")[1];
            // add it to the correct array of fields 
            fieldData.push([fieldServiceID, fieldName]);
        }

        if(props.service === "Jama")
            props.setJamaFieldsToLink(fieldData);
        else if(props.service === "Jira")
            props.setJiraFieldsToLink(fieldData);
        
    }
    

    // format data for UI. excludes any nested subfields 
    const formatData = () => {
        var data = [];
        var i = 0;

        // parse/replace for a more readable field name. add index, service ID and name 
        Object.entries(props.itemData).forEach((key) => {
            if(typeof key[1] !== 'object' && key[1] !== "[]" && key[1] !== "{}" && key[1] !== null && !key[0].includes("customfield_10019")) {  // customfield_10019 = i|:1009 and idk what that means 
                if(!key[0].includes("$") && !key[0].includes("_")) {
                    data.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        // adds a space before uppercase letters if in camelCase
                        "fieldName": key[0].replace((/([^A-Z](?=[A-Z]))/g), "$1 ").toLowerCase()
                    })
                }
                // we know this field is story points 
                else if(key[0].includes("customfield_10016")) {
                    data.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].replace("customfield_10016", "story points")
                    })
                }
                else {
                    data.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0].split('$')[0].replaceAll("_", " ")
                    })
                }
                i += 1;
            }
        })
        return data;
    }

    // add the table of fields from the formatted data to the DOM
    const renderTable = () => {
        var data = formatData();
        var checkboxName = (props.service === "Jama") ? "jama_checkbox" : "jira_checkbox";
        return data.map((row) => {
            const { index, fieldServiceID, fieldName, checked } = row;
            var fieldData = [fieldServiceID, fieldName];
            return (    
                <tr className="linked_fields_row" key={index}>
                    <td id="field_index" className="link_fields_data">{index}</td>
                    <td id="field_service_id" className="link_fields_data">{fieldServiceID}</td>
                    <td id="field_name" className="link_fields_data">{fieldName}</td>
                    <td className="link_fields_data">
                    <div className="link_fields_checkbox">
                        <input
                            type="checkbox"
                            id={`${checkboxName}_${index}`}
                            onChange={handleCheckbox}
                            value={fieldData}
                            name={checkboxName}
                            checked={checked}
                            className="link_checkbox"
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