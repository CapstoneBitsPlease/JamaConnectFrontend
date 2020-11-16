import React from "react";
import { SelectItem } from "../pages";
import { SyncManually } from "./index";
import '../styles/components/JiraIssueContent.style.sass';
const JiraIssueContent = () => {

  return (
    <div className="issue-container">
      <SelectItem />
      <SyncManually />
    </div>
  );
};

export default JiraIssueContent;
