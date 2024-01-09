import React from "react";

import { useEffect, useState } from "react";
import { IconButton, Container, Grid, Avatar } from "@mui/material";
import { clearTour, getTour, getTours } from "../redux/features/tourSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BiBookmark, BiComment, BiHeart } from "react-icons/bi";
import Spin from "../Spin";

import RightSidebar from "./RightSidebar";

export default function BlogCardDetail() {
  const dispatch = useDispatch();

  const { tour } = useSelector((state) => ({ ...state.tour }));

  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    dispatch(clearTour());

    // Simulate loading delay
    const delay = 1500; // 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, [dispatch, id, setIsLoading]);
  // Conditional rendering to check if tour is available
  if (loading) {
    return <Spin />;
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  if (!tour || !tour.creator) {
    // You can handle the loading state or potential undefined creator here
    return <Spin />;
  }

  return (
    <>
      <Container>
        <Grid container spacing>
          <Grid
            item
            flex
            lg={1}
            sm={12}
            xs={12}
            style={{ paddingTop: "120px" }}
          >
            <IconButton>
              {/* Like icon */}
              <BiHeart />
            </IconButton>
            <br />
            <br />
            <IconButton>
              {/* Comment icon */}

              <BiComment />
            </IconButton>
            <br />
            <br />
            <IconButton>
              {/* Comment icon */}

              <BiBookmark />
            </IconButton>
          </Grid>

          <Grid item sm={12} xs={12} lg={9} className="post post__body ">
            {" "}
            <img
              src={
                tour.imageFile2 ||
                "https://sitechecker.pro/wp-content/uploads/2023/05/URL-meaning.jpg"
              }
              alt="asd"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="">
              <div className="post__author">
                <Avatar link={`/users/${tour.id}`} src={tour.image} />

                <div className="author__details">
                  <a href={`/users/${tour.id}`}>
                    <h4>{tour.name}</h4>
                  </a>
                  {/* <p>{createdAt}</p> */}
                </div>
              </div>
              <br />
              <IconButton>
                {/* Like icon */}
                <BiHeart />
              </IconButton>
              <IconButton>
                {/* Comment icon */}

                <BiComment />
              </IconButton>
              <IconButton>
                {/* Comment icon */}

                <BiBookmark />
              </IconButton>
              <h1 className="post__heading">{tour.title}</h1>
              <div className="tag-section">
                <span className="tag">#{tour.tag1}</span>
                <span className="tag">#{tour.tag2}</span>
                <span className="tag">#{tour.tag3}</span>
                <span className="tag">#{tour.tag4}</span>
              </div>
              {/* ///////////////////////////////////////////// */}
              <div className="post__text">
                <p dangerouslySetInnerHTML={{ __html: tour.description }} />
              </div>
            </div>
          </Grid>

          {/* Right Sidebar */}
          <Grid item sm={12} xs={12} lg={2}>
            <>
              {/* Add user detail section */}
              <div className="post__author">
                <RightSidebar />
              </div>
            </>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
