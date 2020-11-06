import { action, thunk } from "easy-peasy";
import axios from "axios";

const linkStore = {
    itemData: [],
    issueData: [],

    // API call to retrieve the fields of an item from the Jama database given its ID
    getFieldsOfItem: thunk((actions, itemID) => {
        axios
          .get(
            `http://127.0.0.1:5000/jama/item_by_id?id=${itemID}`
          )
          .then(response => {
            console.log("success");
            console.log(response.data);
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
    })

}

export default linkStore;