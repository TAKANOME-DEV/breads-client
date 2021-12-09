import { Grid } from "@mui/material";
import React from "react";

interface AsideProps {
  children: React.ReactNode;
}

const Aside: React.FunctionComponent<AsideProps> = ({ children }) => {
  return (
    <Grid xs={12} sm={12} item md={12} lg={3} sx={{ order: { lg: 1, md: 2 } }}>
      {children}
    </Grid>
  );
};

export default Aside;
