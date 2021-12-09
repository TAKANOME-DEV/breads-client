import React from "react";
import DefaultImage from "../images/white-background.png";
import { CardHeader, Avatar } from "@mui/material";

interface UserImageProps {
  image?: string;
  username?: string;
}

const UserImage: React.FunctionComponent<UserImageProps> = ({
  image,
  username,
  children,
}) => {
  return (
    <CardHeader
      avatar={
        <Avatar>
          <img src={image || DefaultImage} alt={username} />
        </Avatar>
      }
      title={children}
    />
  );
};

export default UserImage;
