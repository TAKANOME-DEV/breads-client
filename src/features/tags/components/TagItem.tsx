import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTagById } from "../selectors";
import { RootState } from "../../rootReducer";
import { ListItemButton, ListItemText, Typography } from "@mui/material";

type TagItemProps = PropsFromRedux & OwnProps;

interface OwnProps {
  key: number;
  id: number;
}

class TagItem extends Component<TagItemProps> {
  render() {
    const { tag, key } = this.props;

    return (
      <ListItemButton>
        <ListItemText
          key={key}
          primary={
            <NavLink exact to={`/tag/${tag.id}`}>
              <Typography display={"flex"} justifyContent="space-between">
                #{tag.tag_name}
                {tag.count > 1 && (
                  <Typography component="span">{tag.count}</Typography>
                )}
              </Typography>
            </NavLink>
          }
        />
      </ListItemButton>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    tag: getTagById(state, ownProps.id),
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TagItem);
