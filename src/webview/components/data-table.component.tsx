import { Paper } from "@mui/material";
import type { DataGridProps } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import type { Command } from "../../shared/definitions/command.definitions";
import usePostMessage from "../hooks/post-message.hook";
import Empty from "./empty.component";

type Props = { command: Command } & DataGridProps;

const defaultPageSize = 25;

export default function DataTable(props: Props): JSX.Element {
  console.log("DataTable", props);

  const { command } = props;
  const { data, isLoading } = usePostMessage({ command });

  const rowsCount = data?.length || 0;
  if (!isLoading && !rowsCount) {
    return <Empty />;
  }

  const pageSize = rowsCount > defaultPageSize ? Math.ceil(rowsCount / defaultPageSize) : defaultPageSize;

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        loading={isLoading}
        paginationModel={{ page: 0, pageSize }}
        pageSizeOptions={[5, 10, 25, 50]}
        rows={data}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        sx={{ border: 0 }}
        {...props}
      />
    </Paper>
  );
}
