import { Paper } from "@mui/material";
import React from "react";
import usePostMessage from "../hooks/post-message.hook";
import Empty from "./empty.component";

type Props = { command: Message["command"] };

export default function Data(props: Props): JSX.Element {
  const { command } = props;
  const postMessage = usePostMessage({ command });

  if (!postMessage?.data) {
    return <Empty />;
  }

  return <Paper sx={{ height: "100%", width: "100%" }}>{JSON.stringify(postMessage.data)}</Paper>;
}
