import React from 'react'
import {SyncFieldsOnCreateIssue, SelectItem} from "../pages"
import {SyncManually} from "./SyncManually"
function JiraIssueContent() {
  return (
    <div>
      {/* <SelectItem/> */}
      <SyncManually/>
      {/* <SyncFieldsOnCreateIssue/> */}
    </div>
  )
}

export default JiraIssueContent
