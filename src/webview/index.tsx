import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import GetSuites from "./components/get-suites.component";
import GetTestCases from "./components/get-tests-cases.component";
import SaveTestCases from "./components/save-tests-cases.component";

export default function App() {
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  console.log("App -> command", window.command);

  const renderView = () => {
    switch (window.command) {
      case "get-suites":
        return <GetSuites />;
      case "get-test-cases":
        return <GetTestCases />;
      case "save-test-cases":
        return <SaveTestCases />;
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
