import React from "react";

const LinkFieldsTable = (props) => {

    // retrieve from the response data what we need for the table
    const formatData = () => {
        var data = [];
        var i = 1;
        Object.keys(props.itemData).forEach(key => {
            if(!key.startsWith("custom") && !key.startsWith("aggregate")) {
                data.push({
                    "id": i, 
                    "name": key
                })
                i += 1;
            }
            
        })
        return data;
    }

    // add the table of fields from the formatted data to the DOM
    const renderTable = () => {
        var data = formatData();
        console.log(data);
        return data.map((row) => {
            const { id, name } = row;
            return (    
                <tr className="linked_fields_row" key={id}>
                    <td className="linked_fields_data">{id}</td>
                    <td className="linked_fields_data">{name}</td>
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
                        <th className="linked_fields_headers">ID</th>
                        <th className="linked_fields_headers">Name</th>
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