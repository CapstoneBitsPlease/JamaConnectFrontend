import React from 'react'
import {SyncFieldsOnCreateIssue, SelectItem} from "../domains"
function JiraIssueContent() {
  return (
    <div>
      <SelectItem/>
      <SyncFieldsOnCreateIssue/>
    </div>
  )
}

export default JiraIssueContent
