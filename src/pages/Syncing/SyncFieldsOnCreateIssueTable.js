import React, {useState} from 'react';        


const SyncFieldsOnCreateIssueTable = (props) => {
    // default fields to choose from when creating issue in Jira
    const [issueFields] = useState([
        "Assignee", "Attachment", "Description", "Fix versions", "Flagged", "Labels", "Linked issues",
        "Reporter", "Sprint", "Story point estimate", "Summary"
    ]);

    // format table data 
    const formatData = () => {
        let data = [];
        for(let i=0; i < issueFields.length; i++){
            data.push({
                "id": i+1,
                "checkboxID": `${issueFields[i]}_field_checkbox`, 
                "name": issueFields[i],
                "isChecked": false
            })
        }
        return data;
    }

    // format table data and add it to the DOM
    const renderTableData = () => {
        var data = formatData();
        return data.map((row) => {
            const { id, checkboxID, name, checked } = row;
            return (    
                <tr key={id}>
                    <td className="sync_fields_data">{name}</td>
                    <td className="sync_fields_data">
                        <div>
                            <input
                                type="checkbox"
                                id={checkboxID}
                                onChange={props.handleCheckbox}
                                value={name}
                                name="controlled-checkbox"
                                checked={checked}
                            >
                            </input>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <table className="sync_fields_table">
            <tbody>
                {renderTableData()}
            </tbody>
        </table> 
    )
}

export default SyncFieldsOnCreateIssueTable;