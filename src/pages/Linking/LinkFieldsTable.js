import React from "react";

const LinkFieldsTable = (props) => {

    // handles the checkbox input. adds each service ID and name to an array if it is checked
    const handleCheckbox = () => {   
        var checked = [];
        const checked_values = document.getElementsByName('controlled-checkbox');
        // add the checked value (fieldServiceID,fieldName) to the new array if it gets checked
        for(let i = 0; i < checked_values.length; i++) {
            if(checked_values[i].checked) {
                checked.push(checked_values[i].value);
            }
        }
        // split the data
        for(let i = 0; i < checked.length; i++) {
          var fieldServiceID = checked[i].split(",")[0];
          var fieldName = checked[i].split(",")[1];
        }
        // add it to the correct array of fields 
        if(props.service === "Jama")
            props.setJamaFieldsToLink(jamaFieldsToLink => [...jamaFieldsToLink, [fieldServiceID, fieldName]]);
        if(props.service === "Jira")
            props.setJiraFieldsToLink(jiraFieldsToLink => [...jiraFieldsToLink, [fieldServiceID, fieldName]]);
    }

    // format data for UI. excludes nested subfields 
    const formatData = () => {
        var data = [];
        var i = 0;

        // parse/replace for a more readable field name. add index, service ID and name 
        Object.entries(props.itemData).forEach((key) => {
            if(typeof key[1] !== 'object' && key[1] !== "{}" && key[1] !== null && !key[0].includes("customfield_10019")) {
                if(!key[0].includes("$") && !key[0].includes("_")) {
                    data.push({
                        "index": i+1, 
                        "fieldServiceID": key[0],
                        "fieldName": key[0]
                    })
                }
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
        return data.map((row) => {
            const { index, fieldServiceID, fieldName, checked } = row;
            var fieldData = [fieldServiceID, fieldName]
            return (    
                <tr className="linked_fields_row" key={index}>
                    <td className="linked_fields_data">{index}</td>
                    <td className="linked_fields_data">{fieldServiceID}</td>
                    <td className="linked_fields_data">{fieldName}</td>
                    <td className="linked_fields_data">
                    <div className="linked_fields_checkbox">
                        <input
                            type="checkbox"
                            id={`checkbox_${index}`}
                            onChange={handleCheckbox}
                            value={fieldData}
                            name="controlled-checkbox"
                            checked={checked}
                        ></input>
                    </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="link_fields_table_container">
            <h3 className="fields_table_title">{props.service} Fields</h3>
            <table className="linked_fields_table">
                <thead>
                    <tr className="linked_fields_row">
                        <th className="linked_fields_headers">No.</th>
                        <th className="linked_fields_headers">Field Service ID</th>
                        <th className="linked_fields_headers">Field Name</th>
                        <th className="linked_fields_headers">Link</th>
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