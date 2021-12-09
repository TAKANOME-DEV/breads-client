import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import TagsList from "./TagsList";
import { getMostRecentTagIds, getTopTagsIds } from "../selectors";
import { RootState } from "../../rootReducer";
import { Button, ButtonGroup } from "@mui/material";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TagsAsideState = {
  activeTags: string;
};

type TagsAsideProps = PropsFromRedux & OwnProps;

interface OwnProps {
  list: string;
}

type ButtonType =
  | "primary"
  | "inherit"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | undefined;

class TagsAside extends Component<TagsAsideProps, TagsAsideState> {
  constructor(props: TagsAsideProps) {
    super(props);
    this.state = {
      activeTags: "top",
    };
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let name = e.currentTarget.name;
    this.setState((prevState) => ({
      activeTags: prevState.activeTags !== name ? name : "",
    }));
  };

  render() {
    const { mostRecentTags, topTags } = this.props;
    const { activeTags } = this.state;

    let visibleTags = activeTags === "new" ? mostRecentTags : topTags;
    let isHidden = activeTags === "" ? "hidden" : "";
    let activeTop: ButtonType = activeTags === "top" ? "primary" : "inherit";
    let activeNew: ButtonType = activeTags === "new" ? "primary" : "inherit";

    return (
      <>
        <ButtonGroup sx={{ width: "100%" }}>
          <Button
            onClick={this.handleClick}
            variant="contained"
            color={`${activeTop}`}
            sx={{ fontWeight: "bold", width: "100%" }}
            name="top"
          >
            Top Tags
          </Button>
          <Button
            onClick={this.handleClick}
            variant="contained"
            color={`${activeNew}`}
            sx={{ fontWeight: "bold", width: "100%" }}
            name="new"
          >
            New Tags
          </Button>
        </ButtonGroup>
        <TagsList tags={visibleTags} isHidden={isHidden} />
      </>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    mostRecentTags: getMostRecentTagIds(state, ownProps.list),
    topTags: getTopTagsIds(state, ownProps.list),
    loading: state.loading,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps)(TagsAside);
