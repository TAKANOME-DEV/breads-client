import React from "react";
import { Card as CardMUI, CardContent, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { arrayOfIds } from "../features/subscriptions/types";
import UserImage from "./UserImage";

interface CardProps {
  id?: string;
  image?: string;
  username?: string;
  followings?: arrayOfIds | null;
  followers?: arrayOfIds | null;
  children: React.ReactNode;
}

const Card: React.FunctionComponent<CardProps> = ({
  id,
  image,
  username,
  followings,
  followers,
  children,
}) => {
  function addImageTransformation(image: string): string | undefined {
    let imageURL: URL = new URL(image);
    let pathnameArray: string[] = imageURL.pathname.split("/");
    let originalPathnameArray: string[] = pathnameArray.slice();

    for (let i = 0; i < originalPathnameArray.length; i++) {
      if (pathnameArray[i] === "upload") {
        pathnameArray.splice(i + 1, 0, "w_567,h_567,c_fill,g_face");
        imageURL.pathname = pathnameArray.join("/");
        return imageURL.href;
      }
    }
  }

  let updatedImage: string | undefined;
  if (image) updatedImage = addImageTransformation(image);

  return (
    <CardMUI sx={{ marginBottom: "15px" }}>
      {image ? (
        <UserImage image={updatedImage} username={username}>
          <div className="avatar__intro">
            <h4 className="avatar__name">{username}</h4>
            <NavLink
              exact
              to={`/${id}/following`}
              activeClassName="bg-light btn-outline-secondary"
              className="btn text-primary btn-sm readings-sum"
            >
              Following: {followings ? followings.length : 0}
            </NavLink>
            <span> </span>
            <NavLink
              exact
              to={`/${id}/followers`}
              activeClassName="bg-light btn-outline-secondary"
              className="btn text-primary btn-sm readings-sum"
            >
              Followers: {followers ? followers.length : 0}
            </NavLink>
          </div>
        </UserImage>
      ) : (
        <Typography variant="h6" margin={"10px 0 0 15px"} fontWeight={"bold"}>
          {username}
        </Typography>
      )}
      <CardContent>{children}</CardContent>
    </CardMUI>
  );
};

export default Card;
