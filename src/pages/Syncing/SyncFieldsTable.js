import React from 'react';
import {Checkbox} from '@atlaskit/checkbox';

/* Component to format and render the table to choose fields to sync */
const SyncFieldsTable = (props) => {

    //  grab from the response only the data we need 
    const formatData = () => {
        var data = [];
        
        for(let i=0; i < props.responseLength; i++) {
            data.push({
                "id": i+1, 
                "checkboxID": `checkbox_${i+1}`,
                "jamaName": props.linkedData[i][3], 
                "jiraName": props.linkedData[i][4],
                "fieldServiceID": "fieldServiceID",
                "isChecked": false
            })
        }

        return data;
    }

    // format data and add it to the DOM
    const renderTableData = () => {
        var data = formatData();
        return data.map((row) => {
            const { id, checkboxID, jamaName, jiraName, checked } = row;
            return (    
                <tr className="linked_fields_row" key={id}>
                    <td className="linked_fields_data">{id}</td>
                    <td className="linked_fields_data">{jamaName}</td>
                    <td className="linked_fields_data">{jiraName}</td>
                    <td className="linked_fields_data">
                        <div className="linked_fields_checkbox">
                            <Checkbox
                                id={checkboxID}
                                isChecked={checked}
                                onChange={props.handleCheckbox}
                                value={id}
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
        <div>
            <h3 className="fields_table_title">Linked fields</h3>
            <table className="linked_fields_table">
                <thead>
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
        </div>
    )
}

export default SyncFieldsTable;