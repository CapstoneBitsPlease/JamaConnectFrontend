import React, {useState} from 'react';
import Button from '@atlaskit/button';
import SyncFieldsOnCreateIssueTable from './SyncFieldsOnCreateIssueTable';
import '../../styles/pages/SyncFieldsOnCreateIssue.style.sass'; 

// Button and table that are added to the "Create Issue" view. Allows the user to select which fields to sync when creating a new issue in Jira 
const SyncFieldsOnCreateIssueContainer = () => {
    const [isSelected, setIsSelected] = useState("");
    const [renderSelected, setRenderSelected] = useState(false);
    const [checkedFields, setCheckedFields] = useState([]);

    // display or hide the table of fields and checkboxes
    const handleChange = (e) => {
        e.preventDefault()
        if(renderSelected === false) {
            setIsSelected("isSelected");
            setRenderSelected(true);
        }
        else {
            setIsSelected("");
            setRenderSelected(false);
        }
    }

    // handle field checkboxes and save them
    const handleCheckbox = () => {   
        var checked = [];
        const checked_values = document.getElementsByName('controlled-checkbox');
        for(let i = 0; i < checked_values.length; i++) {
            if(checked_values[i].checked)
                checked.push(checked_values[i].value);
        }
        console.log(checked);
        setCheckedFields(checked);

        // append array of checked IDs to the DOM as they are checked/unchecked for testing purposes
        /*if(document.getElementById("test_div")) {
            var testDiv = document.getElementById("test_div");
            testDiv.remove()
        }
        testDiv = document.createElement("div");
        testDiv.id = "test_div";
        testDiv.innerHTML = `<p>${checked}<p>`
        document.body.appendChild(testDiv);*/
    }

    return (
        <div className="page_container">
            <Button 
                id="select_fields_to_sync_button"
                className="select_fields_to_sync_button"
                isSelected={isSelected}
                onClick = {handleChange}
            >Fields to sync with Jama</Button>
            <div className="sync_fields_table_container">
                { renderSelected && 
                    <SyncFieldsOnCreateIssueTable
                        handleCheckbox={handleCheckbox}
                    />
                }
            </div>
        </div>
    )
}

export default SyncFieldsOnCreateIssueContainer;