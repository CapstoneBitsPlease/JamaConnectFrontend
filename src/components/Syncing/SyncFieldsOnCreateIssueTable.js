import React, {useState} from 'react';     
import {Checkbox} from '@atlaskit/checkbox';    

const SyncFieldsTableOnCreateIssue = (props) => {
    const [issueFields] = useState([
        "Assignee", "Attachment", "Description", "Fix versions", "Flagged", "Labels", "Linked issues",
        "Reporter", "Sprint", "Story point estimate", "Summary"
    ]);

    const formatDataForTable = () => {
        let data = [];
        for(let i=0; i < issueFields.length; i++){
            data.push({
                "id": i+1, 
                "name": issueFields[i],
                "isChecked": false
            })
        }
        return data;
    }

    // format table data and add it to the DOM
    const renderTableData = () => {
        var data = formatDataForTable();
        return data.map((row) => {
            const { id, name, checked } = row;
            return (    
                <tr key={id}>
                    <td className="linked_fields_data">{name}</td>
                    <td className="linked_fields_data">
                        <div className="linked_fields_checkbox">
                            <Checkbox
                                isChecked={checked}
                                onChange={props.handleCheckbox}
                                value={name}
                                name="controlled-checkbox"
                                type="checkbox"
                            />
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

export default SyncFieldsTableOnCreateIssue;