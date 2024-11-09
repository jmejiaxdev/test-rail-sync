import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import type { SaveTestCaseResponse } from "../../shared/definitions/test-case.definitions";
import usePostMessage from "../hooks/post-message.hook";

export default function SaveTestCases(): JSX.Element {
  const postMessage = usePostMessage({ command: "save-test-cases" });
  const saveTestCasesResponse = postMessage.data as SaveTestCaseResponse[];

  const useStyles = {
    "new-test-case": {
      color: "green",
    },
  };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={[
          { field: "id", headerName: "ID", flex: 1 },
          { field: "title", headerName: "Title", flex: 1 },
          { field: "template", headerName: "Template", flex: 1 },
          { field: "type_id", headerName: "Type", flex: 1 },
          { field: "priority_id", headerName: "Priority", flex: 1 },
          { field: "refs", headerName: "Refs", flex: 1 },
          { field: "custom_manual_vs_automated", headerName: "Manual VS Automated", flex: 1 },
          { field: "custom_manual_automated", headerName: "Type Automation", flex: 1 },
          { field: "custom_automation_tool_type", headerName: "Automation Tool Type", flex: 1 },
          { field: "custom_test_level", headerName: "TestLevel", flex: 1 },
        ]}
        rows={saveTestCasesResponse}
        paginationModel={{ page: 0, pageSize: 25 }}
        pageSizeOptions={[5, 10]}
        getRowClassName={(params) => (params.row.isNew ? "new-test-case" : "")}
        sx={{ "border": 0, "& .new-test-case": useStyles["new-test-case"] }}
      />
    </Paper>
  );
}
