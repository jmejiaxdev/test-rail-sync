import { useEffect, useState } from "react";

type Props = { command: Message["command"] };
type State = { isLoading?: boolean } & Message;

export default function usePostMessage(props: Props): State {
  const { command } = props;
  const [state, setState] = useState<State>({ isLoading: true });

  useEffect(() => {
    const listener = (event: PostMessageEvent) => {
      setState({ ...state, ...event.data, isLoading: false });
    };

    window.vscode.postMessage({ command });
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
