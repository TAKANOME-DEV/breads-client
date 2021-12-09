import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";

interface ReadingStatsProps {
  statName: any;
  stat: any;
  loading: any;
  loading_id: any;
}

const ReadingStats: React.FunctionComponent<ReadingStatsProps> = ({
  statName,
  stat,
  loading,
  loading_id,
}) => {
  return (
    <Typography gutterBottom>
      {statName}:{" "}
      {loading.isLoading && loading.id.includes(loading_id) ? (
        <FontAwesomeIcon icon="spinner" pulse />
      ) : (
        <strong> {stat}</strong>
      )}
    </Typography>
  );
};

export default ReadingStats;
