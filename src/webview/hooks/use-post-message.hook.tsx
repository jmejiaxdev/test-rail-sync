import { useEffect, useState } from "react";
import {
  AutomationToolType,
  CustomStatusId,
  ManualVSAutomated,
  Priority,
  Template,
  TestLevel,
  Type,
  TypeAutomation,
} from "../../shared/definitions/test-case.definitions";

type Props = { command: Command };
type State = { isLoading?: boolean } & Message;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapTestCaseProperties = (testCase: any) => {
  testCase.custom_automation_tool_type = AutomationToolType[testCase.custom_automation_tool_type || 0];
  testCase.custom_manual_automated = TypeAutomation[testCase.custom_manual_automated || 0];
  testCase.custom_manual_vs_automated = ManualVSAutomated[testCase.custom_manual_vs_automated || 0];
  testCase.custom_test_level = TestLevel[testCase.custom_test_level || 0];
  testCase.status_id = CustomStatusId[testCase.status_id || 0];
  testCase.priority_id = Priority[testCase.priority_id || 0];
  testCase.template = Template[testCase.template || 0];
  testCase.type_id = Type[testCase.type_id || 0];
};

export default function usePostMessage(props: Props): State {
  console.log("usePostMessage", props);
  const { command } = props;
  const [state, setState] = useState<State>({ isLoading: true });

  useEffect(() => {
    const listener = (event: PostMessageEvent) => {
      console.log("usePostMessage listener", event);

      if (command !== "get-suites") {
        event.data.data.forEach(mapTestCaseProperties);
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
