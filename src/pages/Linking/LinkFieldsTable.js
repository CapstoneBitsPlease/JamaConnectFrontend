import React from "react";

const LinkFieldsTable = (props) => {

    // format data for UI. excludes nested subfields 
    const formatData = () => {
        var data = [];
        var i = 0;

        // adding data we need for field service ID and name  
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
                        "fieldName": key[0].replace("$", "").replace("_", " ")
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
            const { index, fieldServiceID, fieldName } = row;
            return (    
                <tr className="linked_fields_row" key={fieldServiceID}>
                    <td className="linked_fields_data">{index}</td>
                    <td className="linked_fields_data">{fieldServiceID}</td>
                    <td className="linked_fields_data">{fieldName}</td>
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