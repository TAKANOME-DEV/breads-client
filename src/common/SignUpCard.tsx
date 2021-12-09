import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const SignUpCard: React.FunctionComponent = () => {
  return (
    <Card
      sx={{
        marginBottom: "15px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardHeader
        title={
          <Typography component="div" display={"flex"}>
            <Typography role="img" aria-label="bread">
              🍞
            </Typography>
            <Typography fontWeight="bold" px={"5px"}>
              {" "}
              Welcome to BREADS
            </Typography>
            <Typography role="img" aria-label="bread">
              🍞
            </Typography>
          </Typography>
        }
      />
      <CardContent sx={{ marginTop: "-10px" }}>
        <Typography>Keep track of what you read online</Typography>
        <Typography component="div">
          <Typography component="div" display={"flex"} mt={"10px"}>
            Sign up above
            <Typography role="img" aria-label="up-arrow">
              ⬆️
            </Typography>
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
