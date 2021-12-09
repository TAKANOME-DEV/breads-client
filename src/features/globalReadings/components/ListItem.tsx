import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Moment from "react-moment";
import { Link as RouterLink } from "react-router-dom";
import UserImage from "../../../common/UserImage";
// import Summary from '../../summary/Summary';
import Favorites from "./Favorites";
import Delete from "./Delete";
import Update from "./Update";
import Tags from "./Tags";
import { getReadingById } from "../selectors";
import BreadsImage from "../../../images/breads-wesual-click.jpg";
import { RootState } from "../../rootReducer";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";

type OwnProps = {
  id: any;
  style: any;
  list: any;
  outdated: any;
  measure: any;
  isCorrectUser?: any;
};

type ListItemProps = PropsFromRedux & OwnProps;

const ListItem: React.FunctionComponent<ListItemProps> = ({
  id,
  style,
  isCorrectUser,
  list,
  users,
  reading,
  summary,
  currentUser,
  outdated,
  tags,
  measure,
}) => {
  const minutes = Math.round(reading.word_count / 300);

  function addImageTransformation(image: any): string | undefined {
    let imageURL = new URL(image);
    let pathnameArray = imageURL.pathname.split("/");
    let originalPathnameArray = pathnameArray.slice();
    for (let i = 0; i < originalPathnameArray.length; i++) {
      if (pathnameArray[i] === "upload") {
        pathnameArray.splice(i + 1, 0, "w_96,h_96,c_fill,g_face");
        imageURL.pathname = pathnameArray.join("/");
        return imageURL.href;
      }
    }
  }

  function serveImageThroughCDN(): string {
    let image = getImageDimensions();
    if (reading && reading.reading_image) {
      return `https://images.weserv.nl/?url=${reading.reading_image}&w=${image.width}&h=${image.height}&fit=cover&output=webp`;
    } else {
      return BreadsImage;
    }
  }

  function getImageDimensions(): { width: number; height: number } {
    if (window.innerWidth >= 997) {
      return {
        width: 550,
        height: 300,
      };
    } else {
      return {
        width: 320,
        height: 175,
      };
    }
  }

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    let source = event.target as HTMLImageElement;
    source.onerror = null;
    source.remove();
  };

  let newUserImage = addImageTransformation(users[reading.reader].image);
  let newReadingImage = serveImageThroughCDN();

  return (
    <Card sx={{ marginBottom: "15px" }}>
      {!isCorrectUser && (
        <UserImage
          image={newUserImage}
          username={users[reading.reader].username}
        >
          <Typography component="div">
            <Typography>
              <RouterLink to={`/${users[reading.reader].id}`}>
                {users[reading.reader].username}
              </RouterLink>
            </Typography>
            <Typography variant="subtitle2" color={"textSecondary"}>
              <Moment fromNow ago>
                {reading.created_at}
              </Moment>{" "}
              {tags && <Tags reading={reading} tags={tags} list={list} />}
            </Typography>
          </Typography>
        </UserImage>
      )}
      <CardMedia
        component="img"
        loading="lazy"
        image={newReadingImage}
        onError={imageOnErrorHandler}
        onLoad={measure}
      />

      <CardContent>
        <Link
          underline="hover"
          href={`${reading.url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h5" gutterBottom>
            {reading.title}
          </Typography>
        </Link>
        <Typography gutterBottom>{reading.description}</Typography>
        <div>
          <Typography
            component="div"
            variant="body2"
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography color={"primary"}>{reading.domain}</Typography>
            <Typography color={"textSecondary"}>
              {minutes > 0 && `${minutes} min read`}
            </Typography>
          </Typography>
          {list !== "global" && list !== "subscriptions" && (
            <div className="button-group button-group--block">
              {(currentUser.user?.id === reading.reader ||
                currentUser.user?.id === 1) &&
                outdated === "true" && (
                  <Update
                    user_id={reading.reader}
                    reading_id={id}
                    url={reading.url}
                  />
                )}
              <Favorites
                id={id}
                reader={reading.reader}
                favorite={reading.favorite}
              />
              <Delete id={id} reader={reading.reader} />
            </div>
          )}
          {/* {summary?.id === reading?.id &&
                        <p className='summary-data'>{summary.data}</p>
                    } */}
        </div>
      </CardContent>
    </Card>
  );
};

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    users: state.user,
    reading: getReadingById(state, ownProps.list, ownProps.id),
    currentUser: state.currentUser,
    summary: state.summary,
    tags: state.tags,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ListItem);
