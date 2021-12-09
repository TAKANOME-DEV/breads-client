import React from "react";
import { Grid } from "@mui/material";

const Timeline: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Grid container columnSpacing={2} justifyContent={"center"}>
      {children}
    </Grid>
  );
};

export default Timeline;
