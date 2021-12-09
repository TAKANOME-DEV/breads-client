import { Grid } from "@mui/material";
import React from "react";

interface LeftAsideProps {
  children: React.ReactNode;
}

const LeftAside: React.FunctionComponent<LeftAsideProps> = ({ children }) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={3} sx={{ order: { lg: 3, md: 1 } }}>
      {children}
    </Grid>
  );
};

export default LeftAside;
