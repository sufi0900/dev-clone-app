import React, { useEffect } from "react";

import { FaRegComment } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPortfoliosByUser } from "../redux/features/portfolioSlice";
import Avatar from "@mui/material/Avatar";
import { GiUnicorn } from "react-icons/gi";

import { FaSurprise } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AvatarGroup from "@mui/material/AvatarGroup";
import Grid from "@mui/material/Grid";
import { AccessTime, Bookmark } from "@mui/icons-material";

const ArticleComponent = ({
  title,
  imageFile2,
  _id,
  creatorImage,
  creatorName,
  createdAt,
  tag1,
  tag2,
  tag3,
  tag4,
}) => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state.auth }));

  // const userId = user?.result?._id;

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(getPortfoliosByUser(userId));
  //   }
  // }, [dispatch, userId]);

  // Check if userPortfolios is an array and has at least one element

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Grid item xs={12} className="article" style={{ overflow: "auto" }}>
      {imageFile2 && (
        <Link
          to={`/tour/${_id}`}
          className="article__image"
          style={{
            backgroundImage: `url(${imageFile2})`,
          }}
        >
          &nbsp;
        </Link>
      )}
      <div className="article__details">
        <div className="u-pic">
          <Avatar src={creatorImage} alt="" />
        </div>

        <div className="u-details">
          <span className="u-name">{creatorName}</span>

          <span className="time">{formattedDate}</span>

          <Link to={`/tour/${_id}/`}>
            <h3>{title}</h3>
          </Link>

          <div className="tags">
            <span className="tag">#{tag1}</span>
            <span className="tag">#{tag2}</span>
            <span className="tag">#{tag3}</span>
            <span className="tag">#{tag4}</span>
          </div>

          <div className="additional-details">
            <div className="reactions">
              <AvatarGroup style={{ overflow: "visible" }}>
                <Avatar
                  sx={{
                    background: "transparent",
                    backgroundColor: "transparent",
                    borderColor: "blue",
                  }}
                >
                  <FavoriteIcon style={{ color: "red" }} />
                </Avatar>
                <Avatar
                  sx={{ background: "transparent", borderColor: "transparent" }}
                >
                  <GiUnicorn style={{ color: "purple" }} />
                </Avatar>
                <Avatar
                  sx={{ background: "transparent", borderColor: "transparent" }}
                >
                  <FaSurprise style={{ color: "orange" }} />
                </Avatar>
                <Avatar
                  sx={{
                    overflow: "visible",
                    background: "transparent",
                    color: "black",
                    position: "relative",
                    left: "30px",
                  }}
                >
                  reactions
                </Avatar>
                <Avatar
                  sx={{
                    background: "transparent",
                    color: "black",
                    marginLeft: "50px",
                    position: "relative",
                    left: "80px",
                  }}
                >
                  <FaRegComment />
                  <span
                    style={{
                      fontSize: "16px",
                      position: "relative",
                      left: "2px",
                    }}
                  >
                    27
                  </span>
                </Avatar>
              </AvatarGroup>
              &nbsp; &nbsp;
              <span>&nbsp;</span>
            </div>

            <div className="save">
              <br />
              <small>
                {" "}
                <AccessTime style={{ position: "relative", top: "5px" }} /> 3
                minute read
              </small>
              <button style={{ background: "transparent" }}>
                {" "}
                <Bookmark />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default ArticleComponent;
