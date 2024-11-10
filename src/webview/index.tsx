import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import DataTable from "./components/data-table.component";
import Data from "./components/data.component";

const suitesColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "url", headerName: "URL", flex: 1 },
];

const testCasesColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "template", headerName: "Template", flex: 1 },
  { field: "type_id", headerName: "Type", flex: 1 },
  { field: "priority_id", headerName: "Priority", flex: 1 },
  { field: "refs", headerName: "Refs", flex: 1 },
  { field: "custom_manual_vs_automated", headerName: "Manual VS Automated", flex: 1 },
  { field: "custom_manual_automated", headerName: "Type Automation", flex: 1 },
  { field: "custom_automation_tool_type", headerName: "Automation Tool Type", flex: 1 },
  { field: "custom_test_level", headerName: "TestLevel", flex: 1 },
];

export default function App(): JSX.Element {
  const darkTheme = createTheme({ palette: { mode: "dark" } });

  const { command } = window;

  const renderView = () => {
    switch (command) {
      case "get-suites":
        return <DataTable columns={suitesColumns} command={command} />;
      case "add-test-case":
      case "delete-test-case":
      case "get-test-case":
      case "update-test-case":
        return <Data command={command} />;
      case "add-test-cases":
      case "delete-test-cases":
      case "get-test-cases":
      case "update-test-cases":
        return <DataTable columns={testCasesColumns} command={command} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {renderView()}
    </ThemeProvider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
