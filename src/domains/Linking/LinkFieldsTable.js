import React from "react";

const LinkFieldsTable = (props) => {

    return (
        <table className="linked_fields_table">
            <h3 className="linked_fields_title">{props.service} Fields</h3>
            <thead>
                <tr className="linked_fields_row">
                    <th className="linked_fields_headers">ID</th>
                    <th className="linked_fields_headers">Name</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    )

}

export default LinkFieldsTable;