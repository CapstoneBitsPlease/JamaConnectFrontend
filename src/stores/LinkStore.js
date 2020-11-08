import { action, thunk } from "easy-peasy";
import axios from "axios";

const token= ""
const devURL = "http://127.0.0.1:5000";

const linkStore = {
    itemData: [],
    issueData: [],

    // API call to retrieve the columns of an item from the capstone database given its ID
    getJamaFields: thunk((actions, itemID) => {
        axios
        .get(
          `${devURL}/jama/item_by_id?item_id=${itemID}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
          console.log("jama/item_by_id success");
          console.log(response.data.fields);
          actions.setItemData(response.data.fields);
        })
        .catch((error) => {
          console.log(error.response);
          alert("Error retrieving item fields from backend");
        });
    }),

    setItemData: action((state, newItemData) => {
      state.itemData = newItemData;
    }),

    // API call to retrieve the columns of an item from the capstone database given its ID
    getJiraFields: thunk((actions, issueID) => {
      axios
      .get(
        `${devURL}/jira/item_by_id?id=${issueID}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log("jira/item_of_id success");
        console.log(response.data.fields);
        actions.setIssueData(response.data.fields);
      })
      .catch(error => {
        console.log("error:", error);
        alert("Error retrieving item fields from backend");
      });
    }),

    setIssueData: action((state, newIssueData) => {
        state.issueData = newIssueData;
    }),

    linkItems: thunk((actions, params) => {
      axios({
        url: `${devURL}/link_items`,
        method: "post",
        data: params
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log("error: ", error);
        })
    })

}

export default linkStore;