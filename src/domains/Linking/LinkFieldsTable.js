import React from "react";

const LinkFieldsTable = (props) => {

    // retrieve from the response data what we need for the table
    const formatData = () => {
        var data = [];
        for(let i=0; i < props.responseLength; i++) {
            // get the id and name from response data

        }

        // add data to new array 

        return data;
    }

    // add the table of fields from the formatted data to the DOM
    const renderTable = () => {
        var data = formatData();
        return data.map((row) => {
            const { id, name } = row;
            return (    
                <tr className="fields_row" key={id}>
                    <td className="fields_data">{id}</td>
                    <td className="fields_data">{name}</td>
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