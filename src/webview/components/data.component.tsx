import { Paper } from "@mui/material";
import React from "react";
import type { Command } from "../../shared/definitions/command.definitions";
import usePostMessage from "../hooks/post-message.hook";
import Empty from "./empty.component";

// TODO: Need to resolve enums
type Props = { command: Command };

export default function Data(props: Props): JSX.Element {
  console.log("Data", props);

  const { command } = props;
  const { isLoading, data } = usePostMessage({ command });

  if (!isLoading && !data) return <Empty />;

  return (
    <Paper sx={{ height: "100%", paddingTop: "12px", width: "100%", whiteSpace: "pre-wrap" }}>
      {JSON.stringify(data, null, 2)}
    </Paper>
  );
}
