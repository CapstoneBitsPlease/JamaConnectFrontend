import React from 'react';
import '../styles/components/ItemsTable.style.sass';

// Table of the items we are currently viewing fields for - shows project ID, project name, item ID, and item name 
const ItemsTable = (props) => {
    
    const renderItemOrIssue = () => {
        if(props.title === "Jama Project"){
            return (
                <tr className="linked_items_row">
                    <th className="linked_items_headers">Item ID</th>
                    <th className="linked_items_headers">Item Name</th>
                </tr>
            )
        }
        else if(props.title === "Jira Project"){
            return (
                <tr className="linked_items_row">
                    <th className="linked_items_headers">Issue ID</th>
                    <th className="linked_items_headers">Issue Name</th>
                </tr>
            )
        }
    }
               
    return (
        <table className="linked_items_table">
            <tbody>
                <tr>
                    <th className="linked_items_title">{props.title}</th>
                </tr>
                <tr className="linked_items_row">
                    <th className="linked_items_headers">Project ID</th>
                    <th className="linked_items_headers">Project Name</th>
                </tr>
                <tr className="linked_items_row">
                    <td className="linked_items_data">{props.projectID}</td>
                    <td className="linked_items_data">{props.projectName}</td>
                </tr>
                {renderItemOrIssue()}
                <tr className="linked_items_row">
                    <td className="linked_items_data">{props.itemID}</td>
                    <td className="linked_items_data">{props.itemName}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ItemsTable;