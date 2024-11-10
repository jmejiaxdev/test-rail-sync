import { Box, Typography } from "@mui/material";
import React from "react";

export default function Empty(): JSX.Element {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Typography variant="button" gutterBottom sx={{ display: "block" }}>
        No data to display
      </Typography>
    </Box>
  );
}
