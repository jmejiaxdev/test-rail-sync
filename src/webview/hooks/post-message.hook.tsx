import { useEffect, useState } from "react";
import type { Command, Message, PostMessageEvent } from "../../shared/definitions/command.definitions";
import TestCaseUtils from "../utils/test-case.utils";

type Props = { command: Command };
type State = { isLoading?: boolean } & Message;

export default function usePostMessage(props: Props): State {
  console.log("usePostMessage", props);
  const { command } = props;
  const [state, setState] = useState<State>({ isLoading: true });

  useEffect(() => {
    const listener = (event: PostMessageEvent) => {
      if (command !== "get-suites") {
        event.data.data = TestCaseUtils.toFormattedTestCase(event.data.data);
      }
      setState({ ...state, ...event.data, isLoading: false });
    };

    window.vscode.postMessage({ command });
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
