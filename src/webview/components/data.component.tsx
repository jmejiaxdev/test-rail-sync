import { Paper } from "@mui/material";
import React from "react";
import usePostMessage from "../hooks/post-message.hook";
import Empty from "./empty.component";

type Props = { command: Message["command"] };

export default function Data(props: Props): JSX.Element {
  console.log("Data", props);

  const { command } = props;
  const { isLoading, data } = usePostMessage({ command });

  if (!isLoading && !data) {
    return <Empty />;
  }

  return <Paper sx={{ height: "100%", width: "100%" }}>{JSON.stringify(data)}</Paper>;
}
