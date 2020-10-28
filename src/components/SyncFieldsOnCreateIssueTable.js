import React, {useState} from 'react';     
import {Checkbox} from '@atlaskit/checkbox';    

const SyncFieldsTableOnCreateIssue = (props) => {
    const [issueFields, setIssueFields] = useState([
        "Assignee", "Attachment", "Description", "Fix versions", "Flagged", "Labels", "Linked issues",
        "Reporter", "Sprint", "Story point estimate", "Summary"
    ]);


    return (
        <table className="sync_fields_table">
            <tbody>
                {issueFields.map((item, key) => {
                return(
                    <tr className="sync_fields_row" key={key}>
                        <td className="sync_fields_data">{item}</td>
                        <td className="sync_fields_data">
                            <div className="sync_fields_checkbox">
                                <Checkbox
                                    isChecked={props.checkedIDs}
                                    onChange={props.handleCheckbox}
                                    value="2"
                                    name="controlled-checkbox"
                                    type="checkbox"
                                />
                            </div>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table> 
    )
}

export default SyncFieldsTableOnCreateIssue;