import React from "react";

const LinkFieldsTable = (props) => {

    /* Data transformation functions */

    // build each key recursively, add to the array, return the array 
    const buildItemKey = (keyArray, data, path = '') => {
        Object.entries(data).forEach(([key, value]) => {
          // if nested, recurse and add field to key 
          if (value && value.length !== 0 && typeof value === 'object') {
            if (Array.isArray(value)) {
              value.forEach((value) => buildItemKey(keyArray, value, `${path}${key}.`));  
            } else {
              buildItemKey(keyArray, value, path + key +  ".");
            }
          }
          // if not nested, make sure the value exists and append to array if so
          if(value !== null)
            keyArray.push(path + key);
        })
        return keyArray;
    }

    // flatten data and convert object to array of indexes and keys in dot notation 
    const formatData = () => {
        var keyArray = [];
        var data = [];
        var i = 0;

        // flatten nested objects and build field names
        buildItemKey(keyArray, props.itemData, '');

        // append all data that is not null
        Object.keys(keyArray).forEach(() => {
            data.push({
                "index": i+1, 
                "name": keyArray[i]
            })
            i += 1;
        })

        return data;
    }

    /* DOM manipulation functions */

    // add the table of fields from the formatted data to the DOM
    const renderTable = () => {
        var data = formatData();
        return data.map((row) => {
            const { index, name } = row;
            return (    
                <tr className="linked_fields_row" key={index}>
                    <td className="linked_fields_data">{index}</td>
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
                        <th className="linked_fields_headers">No.</th>
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