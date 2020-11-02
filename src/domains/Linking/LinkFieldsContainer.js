import React from "react";
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import LinkedItemsTable from '../../components/LinkedItemsTable';
import LinkFieldsTable from './LinkFieldsTable';
import '../../styles/components/LinkFields.style.sass';

const LinkFieldsContainer = () => {

    // handles the link button. sends array of IDs to link to the backend 
    const handleLink = (event) => {
        event.preventDefault();
        console.log("linking fields");
    }

    // handles the done button. returns user to the issue page
    const handleDone = (event) => {
        event.preventDefault();
        console.log("returning to issue page");
    }

    return (
        <div className="link_page_container">
            <h1 className="link_page_title">Select fields to link</h1>
                <h2 className="link_page_subtitle">You are currently viewing these items:</h2>
                <div className="linked_items_container">
                    {/* this data needs to be obtained from shared state */}
                    <LinkedItemsTable 
                        title="Jama Project"
                        projectID={"selectedJamaProject"}
                        projectName={"selectedJamaProject"}
                        itemID={"selectedJamaItem"}
                        itemName={"selectedJamaItem"}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={"selectedJiraProject"}
                        projectName={"selectedJiraProject"}
                        itemID={"selectedJiraItem"}
                        itemName={"selectedJiraItem"}
                    />
                </div>
                <div className="fields_table_container">
                    <LinkFieldsTable service="Jama" />
                    <LinkFieldsTable service="Jira" />
                </div>
                <div className="user_input_container">
                    <span className="input_fields">
                        <label for="input_fields" className="input_label">Jama field ID</label>
                        <TextField 
                            id="input_text_field"
                            name="basic"
                            className="fields_to_link_input"
                            onChange={(e => console.log(e.target.value))}
                        ></TextField>
                        <label for="input_fields" className="input_label">Jira field ID</label>
                        <TextField 
                            id="input_text_field"
                            name="basic"
                            className="fields_to_link_input"
                            onChange={(e => console.log(e.target.value))}
                        ></TextField>
                    </span>
                    <span className="link_buttons_container">
                        <Button id="link_button" appearance="primary" className="link_button" onClick={handleLink}>Link</Button>
                        <Button id="done_button" appearance="subtle" className="done_button" onClick={handleDone}>Done linking</Button>
                    </span>
                </div>
        </div>
        
    )
}

export default LinkFieldsContainer;
