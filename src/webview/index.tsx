import React from "react";
import { createRoot } from "react-dom/client";

export default function App() {
  return (
    <></>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
