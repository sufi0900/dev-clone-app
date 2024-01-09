import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { IconButton, Container, Grid, Avatar } from "@mui/material";
import { getTour, clearTour, deleteTour } from "../redux/features/tourSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BiBookmark, BiComment, BiHeart } from "react-icons/bi";
import { getToursByUser } from "../redux/features/tourSlice";

import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import UserDetail from "./userdetail";
import Spin from "../Spin";
export default function Dashboard() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [dispatch, userId]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  if (loading && currentPage === 1) {
    return <Spin />;
  }
  return (
    <>
      <UserDetail />

      <Container style={{ paddingTop: "20px" }}>
        <Grid container spacing>
          <Grid
            item
            spacing={2}
            sm={12}
            xs={12}
            lg={12}
            className="post post__body "
          >
            <Typography variant="h2" component="div" align="center">
              My Posts
            </Typography>
            {userTours.map((item) => (
              <Grid padding={1} item xs={12} lg={12} key={item._id}>
                <Card>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <img
                        src={item.imageFile2}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent>
                        <Typography variant="h6" component="div" align="left">
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="div"
                          align="left"
                        >
                          {excerpt(item.description)}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Delete
                            onClick={() => handleDelete(item._id)}
                            style={{ color: "#dd4b39", cursor: "pointer" }}
                          />
                          <Link to={`/editTour/${item._id}`}>
                            <Edit
                              style={{
                                color: "#55acee",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                            />
                          </Link>
                        </div>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
            {loading && currentPage < numberOfPages && (
              <Spin /> // Add a loading spinner while loading more skills
            )}
            <br />
            <br />
            <br />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
