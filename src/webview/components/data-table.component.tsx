import { Paper } from "@mui/material";
import type { DataGridProps } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import usePostMessage from "../hooks/post-message.hook";
import Empty from "./empty.component";

type Props = { command: Message["command"] } & DataGridProps;
const detailsColumn = { field: "id", headerName: "Details", flex: 1 };
const defaultPageSize = 25;

export default function DataTable(props: Props): JSX.Element {
  const { columns, command, ...rest } = props;
  const postMessage = usePostMessage({ command });

  const rowsCount = postMessage?.data?.length || 0;
  if (!rowsCount) {
    return <Empty />;
  }

  const pageSize = rowsCount > defaultPageSize ? Math.ceil(rowsCount / defaultPageSize) : defaultPageSize;

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={[...columns, detailsColumn]}
        loading={postMessage?.isLoading}
        paginationModel={{ page: 0, pageSize }}
        pageSizeOptions={[5, 10, 25, 50]}
        rows={postMessage.data}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        sx={{ border: 0 }}
        {...rest}
      />
    </Paper>
  );
}
