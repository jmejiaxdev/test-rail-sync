import { useEffect, useState } from "react";

type Props = { command: Message["command"] };
type State = Message;

export default function usePostMessage(props: Props): Message {
  console.log("usePostMessage -> props", props);
  const { command } = props;

  const [state, setState] = useState<State>({});

  useEffect(() => {
    if (!command) return;

    const listener = (event: any) => {
      console.log("usePostMessage -> event", event);
      setState({ ...state, ...event.data });
    };

    window.vscode.postMessage({ command });
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return state;
}
