import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ArticleSkeleton from "./ArticleSkeleton";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

import { getTours } from "../redux/features/tourSlice";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { tours } = useSelector((state) => ({
    ...state.tour,
  }));

  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getTours(userId));
    }
  }, [dispatch, userId]);
  return (
    <aside className="rightBar">
      <div className="rightBar__card-hackathon">
        <h1>
          Active Discussion
          {/* <img src="https://picsum.photos/200/300" alt="" /> */}
        </h1>
        <List>
          {tours &&
            tours
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <React.Fragment key={item._id}>
                  <ListItem button component={Link} to={`/tour/${item._id}`}>
                    <ListItemText primary={item.title} />
                  </ListItem>
                  <br />
                </React.Fragment>
              ))}
        </List>
      </div>
    </aside>
  );
};

export default RightSidebar;
