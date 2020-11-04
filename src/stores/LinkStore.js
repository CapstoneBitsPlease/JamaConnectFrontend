import { action, thunk } from "easy-peasy";
import axios from "axios";

const linkStore = {
    itemData: [],
    issueData: [],
    responseLength: 0,
    fieldsToLink: [],

    // API call to retrieve the fields of an item from the capstone database given its ID
    getFieldsOfItem: thunk((actions, itemID) => {
        axios
          .get(
            `http://127.0.0.1:5000/capstone/item_of_id?id=${itemID}`
          )
          .then(response => {
            console.log("success");

            if(response.data.items[0][3] === "Jira") {
              actions.setIssueData(response.data.items);
              actions.setResponseLength(Object.keys(response.data.items).length);
            }
            else if(response.data.items[0][3] === "Jama") {
              actions.setItemData(response.data.items);
              actions.setResponseLength(Object.keys(response.data.items).length);
            }

          })
          .catch(() => {
            console.log("error");
            alert("Error retrieving item fields from backend");
          });
        }),

        setItemData: action((state, newItemData) => {
            state.itemData = newItemData;
        }),

        setIssueData: action((state, newIssueData) => {
          state.issueData = newIssueData;
        }),

        setResponseLength: action((state, newResponseLength) => {
            state.responseLength = newResponseLength;
        }),

}

export default linkStore;