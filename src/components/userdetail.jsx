import React, { useState } from "react";
import { IconButton } from "@mui/material";
// import ButtonLink from "./PortfolioButton";
// import AddEditPortfolio from "../AddEditPortfolio"; // Import your AddEditPortfolio component
// import { Navigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Divider from "@mui/material/Divider";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import Code from "./Code";
import { getPortfoliosByUser } from "../redux/features/portfolioSlice";
// import { Link } from "react-router-dom";
import ButtonLink from "./PortfolioButton";
import { Link } from "react-router-dom";
import FetchData from "./FetchData";
import { Cake, Email, OpenInNew } from "@mui/icons-material";

export default function UserDetail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);
  // const firstPortfolio = userPortfolios?.[0];

  // Check if userPortfolios is an array and has at least one element
  const portfolio =
    Array.isArray(userPortfolios) && userPortfolios.length > 0
      ? userPortfolios[0]
      : null;
  const hasPortfolio = userPortfolios?.length > 0;
  // const buttonText =
  //   userPortfolios?.length > 0 ? "Edit Portfolio" : "Add Portfolio";

  function truncateText(text, maxLength) {
    const words = text.split(" ");
    const truncatedWords = words.slice(0, maxLength);
    const truncatedText = truncatedWords.join(" ");

    if (words.length > maxLength) {
      return truncatedText + " ...";
    } else {
      return truncatedText;
    }
  }
  return (
    <div>
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Grid item xs={12} style={{ overflow: "hidden" }}>
          <div className="moreproject itemabout item">
            <br></br>

            <div>
              <div
                style={{
                  position: "relative",
                  width: "100%", // Adjust the width as needed
                  height: "150px", // Adjust the height as needed
                  overflow: "hidden", // Hide overflow to prevent the cover photo from overflowing
                  background: "#0267ff",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px", // Adjust the top positioning
                    right: "10px", // Adjust the right positioning
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {/* {new Date(data._createdAt).toISOString().split("T")[0]} */}

                  {/* {tour.date} */}
                </div>

                {portfolio ? (
                  <div style={{ width: "100px", height: "100px" }}>
                    <img
                      src={user?.result?.image}
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%)", // Center horizontally
                        width: "130px",
                        height: "130px", // Maintain a square aspect ratio
                        borderRadius: "50%",

                        // border: "2px solid rgba(250, 47, 210, 0.696)",
                      }}
                      alt="Profile"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                      data-aos-duration="500"
                    />
                  </div>
                ) : (
                  <img
                    src="https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg" // Replace with your profile picture URL
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "50%",
                      transform: "translateX(-50%)", // Center horizontally
                      width: "130px",
                      height: "130px", // Maintain a square aspect ratio
                      borderRadius: "50%",

                      border: "2px solid rgba(250, 47, 210, 0.696)",
                    }}
                    alt="Profile"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                    data-aos-duration="500"
                  />
                )}
              </div>

              <div className="About3">
                {" "}
                <h1
                  data-aos="zoom-in"
                  data-aos-delay="200"
                  data-aos-duration="500"
                >
                  {/* {data.title} */}
                </h1>{" "}
              </div>

              <div className="QuillDescription">
                <div className="QuillDescription" style={{ width: "100%" }}>
                  {/* <PortableText
                    value={data.content}
                    components={PortableTextComponent}
                  /> */}

                  {/* <img src={urlFor(data.postimg).url()} alt="Img" /> */}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        {/* /////////////////////////////////////////////// */}

        <Grid
          item
          xs={9}
          padding={2}
          spacing={1}
          className="box"
          style={{ marginBottom: "30px" }}
        >
          {/* <Link to="/dashboardportfolio">
            <button className="button">dashboard</button>
          </Link> */}

          {!hasPortfolio ? (
            <ButtonLink to="/editPortfolio" buttonText="Add Portfolio" />
          ) : (
            <ButtonLink
              to={`/editPortfolio/${userPortfolios[0]._id}`}
              buttonText="Edit Portfolio"
            />
          )}
          {/* /////////////////////////////////////////////// */}

          <br />
          <br />
          <h1>
            <br />
            {user?.result?.name}
            {/* <img src={user?.result?.image} /> */}

            <br />
            <span
              style={{
                marginBottom: "20px",
                fontSize: "15px",
                fontWeight: "lighter",
              }}
            >
              {" "}
              {user?.result?.email}{" "}
            </span>
            {/* {userPortfolios &&
              userPortfolios.map((item) => <Code key={item._id} {...item} />)} */}
          </h1>

          {/* <FetchData /> */}

          {portfolio ? (
            <div>
              <p> {portfolio.fullname}</p>

              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>User has not created their portfolio information yet.</p>
          )}
          <Grid container className="flex">
            {" "}
            <Grid>
              <IconButton style={{ fontSize: "16px" }}>
                <Cake style={{ fontSize: "21px" }} /> &nbsp;
                {portfolio ? <div>{portfolio.homeinfo}</div> : null}
              </IconButton>
            </Grid>
            &nbsp;&nbsp;&nbsp;
            <Grid>
              <IconButton style={{ fontSize: "16px" }}>
                <Email style={{ fontSize: "21px" }} /> &nbsp;
                {portfolio ? <div>{portfolio.email}</div> : null}
              </IconButton>
            </Grid>
            &nbsp;&nbsp;&nbsp;
            <Grid>
              <IconButton style={{ fontSize: "16px" }}>
                <OpenInNew style={{ fontSize: "21px" }} /> &nbsp;
                {portfolio ? (
                  <a href={portfolio.jobtitle}>
                    {" "}
                    <div>{portfolio.jobtitle}</div>
                  </a>
                ) : null}
                {/* <a href={portfolio.jobtitle}>
                  {" "}
                  {portfolio ? <div>{portfolio.jobtitle}</div> : null}
                </a> */}
              </IconButton>
            </Grid>
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </Grid>
          <Grid container className="flex">
            <Grid xs={3}>
              Education:
              <br />{" "}
              {portfolio ? (
                <div>
                  <> {truncateText(portfolio.phone, 10)}</>
                </div>
              ) : null}
            </Grid>
            &nbsp;&nbsp;&nbsp;
            <Grid xs={3}>
              Pronoun: <br />
              {portfolio ? (
                <div>
                  <> {truncateText(portfolio.address, 3)}</>
                </div>
              ) : null}
            </Grid>
            &nbsp;&nbsp;&nbsp;
            <Grid xs={3}>
              Work <br />
              {portfolio ? (
                <div>
                  <> {truncateText(portfolio.github, 12)} </>
                </div>
              ) : null}
              <br />
            </Grid>
          </Grid>
        </Grid>
      </Grid>{" "}
      <br />
      <Divider style={{ width: "100%" }} />
    </div>
  );
}
