import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import type { Suite } from "../../shared/definitions/suite.definitions";
import usePostMessage from "../hooks/post-message.hook";

export default function GetSuites(): JSX.Element {
  const postMessage = usePostMessage({ command: "get-suites" });
  const suites = postMessage.data as Suite[];

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={[
          { field: "id", headerName: "ID", flex: 1 },
          { field: "name", headerName: "Name", flex: 1 },
          { field: "url", headerName: "URL", flex: 1 },
        ]}
        rows={suites}
        paginationModel={{ page: 0, pageSize: 25 }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
