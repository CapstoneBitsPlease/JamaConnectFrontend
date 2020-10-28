import React from 'react';
import {Checkbox} from '@atlaskit/checkbox';

/* Component to format and render the fields table */
const LinkedFieldsTable = (props) => {

    //  grab from the response only the data we need for the fields table
    const formatDataForTable = () => {
        var newJamaNames = [];
        var newJiraNames = [];
        var data = [];
        for(let i=0; i < props.responseLength; i++) {
            for(let j=0; j < 5; j++) {
                if(j === 3)
                    newJamaNames.push(props.linkedData[i][j]);
                if(j === 4)
                    newJiraNames.push(props.linkedData[i][j]);
            }
        }
        for(let i=0; i < props.responseLength; i++){
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
        return data.map((row) => {
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
        <table className="linked_fields_table">
            <thead>
                <tr>
                    <th className="linked_fields_title">Linked fields ready to sync</th>
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
    )
}

export default LinkedFieldsTable;