import React, {useState} from 'react';
import Button from '@atlaskit/button';
import SyncFieldsOnCreateIssueTable from './SyncFieldsOnCreateIssueTable';
import '../../styles/components/SyncFieldsOnCreateIssue.style.sass'; 

// Button and table that are added to the "Create Issue" view. Allows the user to select which fields to sync
const SyncFieldsOnCreateIssueContainer = () => {
    const [isSelected, setIsSelected] = useState("");
    const [renderSelected, setRenderSelected] = useState(false);
    const [checkedIDs, setCheckedIDs] = useState(false);

    // change button to "selected" and display the table of fields and checkboxes
    const handleChange = (e) => {
        e.preventDefault()
        if(renderSelected === false) {
            setIsSelected("isSelected");
            setRenderSelected(true);
        }
        else if (renderSelected === true) {
            setIsSelected("");
            setRenderSelected(false);
        }
    }

    // handle checkboxes
    const handleCheckbox = (event) => {   
        const { type } = event.target;
        var checked = [];
        var checked_value = 0;
        if(type === 'checkbox') {
            const checked_values = document.getElementsByName('controlled-checkbox');
            for(let i = 0; i < checked_values.length; i++) {
                if(checked_values[i].checked)
                    checked.push(checked_values[i].value);
            }
            checked_value = checked;
            setCheckedIDs(checked_value);
            console.log(checked_value)
        }
    }

    return (
        <div className="page_container">
            <Button 
                id="select_fields_to_sync_button"
                className="select_fields_to_sync_button"
                isSelected={isSelected}
                onClick = {handleChange}
            >
                    Fields to sync with Jama
            </Button>
            <div className="sync_fields_table_container">
                { renderSelected && 
                    <SyncFieldsOnCreateIssueTable
                        checkedIDs={checkedIDs}
                        handleCheckbox={handleCheckbox}
                    />
                }
            </div>
        </div>
    )
}

export default SyncFieldsOnCreateIssueContainer;