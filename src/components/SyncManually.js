import React from "react";

export const SyncManually = () => {
  const token = useStoreState(state => state.accountStore.token);
  const jamaIDRef = React.createRef();
  axios
    .post(
      `http://127.0.0.1:5000/sync/single?${jamaIDRef}`,{
      headers: {
        "Authorization" :`Bearer ${token}`,
      }
    }
    )
    .then((reponse) => {
      makeToast("success", "Sync successfully");
 
    })
    .catch(() => {
      makeToast("error", "Invalid input");
    });
  return (
    <div>
      <p>Please enter the Jama Item ID</p>
      <input
          type="jamaID"
          name="jamaID"
          id="ujamaID"
          placeholder="jamaID"
          ref={jamaIDRef}
        />
    </div>
  );
};
