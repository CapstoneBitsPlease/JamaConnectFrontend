import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import LinkedItemsTable from 'components/LinkedItemsTable.js'

/* Component to render page where user can select which fields to sync from the fields currently linked  */
const SyncFieldsPage = () => {
    
    return (
        <div>
            <h1 className="sync_page_title">Jama-Jira link information</h1>
                <div className="linked_items_jama_container">
                    <LinkedItemsTable 
                        title="Jama Project"
                        projectID={"selectedProject"}
                        projectName={"selectedProject"}
                        itemID={"selectedItem"}
                        itemName={"selectedItem"}
                    />
                    <LinkedItemsTable 
                        title="Jira Project"
                        projectID={"selectedProject"}
                        projectName={"selectedProject"}
                        itemID={"selectedItem"}
                        itemName={"selectedItem"}
                    />
                </div>
            <div className="linked_fields_container">

            </div>
        </div>
);

}

export default SyncFieldsPage;