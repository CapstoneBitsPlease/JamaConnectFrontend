import React from "react";

const LinkFieldsTable = (props) => {

    // retrieve from the response data what we need for the table
    const formatData = () => {
        var itemFields = []
        var data = [];
        for(let i=0; i < props.responseLength; i++) {
            // get the id and name

            data.push({
                "id": i+1, 
                "name": ""
            })
            return data;
        }
    }

    // add the table of fields to the DOM
    const renderTable = () => {

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
                </tbody>
            </table>
        </div>
    )

}

export default LinkFieldsTable;