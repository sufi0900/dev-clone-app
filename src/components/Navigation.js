import React, { useState } from "react";
import { FaDev } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { setLogout } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";
import { RiNotificationLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import Spin from "../Spin";

const Navigation = () => {
  const [showMenu, setshowMenu] = useState(false);

  const toggle = () => {
    setshowMenu(!showMenu);
  };

  const { user, isLoading } = useSelector((state) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Store token in local storage after successful login
  if (user && user.token) {
    localStorage.setItem("token", user.token);
  }

  // Retrieve token from local storage after refresh
  const token = localStorage.getItem("token");

  if (!isLoading && token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear(); // Clear the token from local storage
    navigate("/");
  };

  if (isLoading) {
    // User data is being fetched, show loading indicator or placeholder content
    return <Spin />;
  }

  return (
    <header className="header">
      <div className="headerContainer">
        <Link to="/" className="headerContainer__logo">
          <FaDev size="3.125rem" color="blue" />
        </Link>

        <div className="headerContainer__searchBox">
          <form>
            <input type="text" placeholder="Search..." aria-label="search" />
          </form>
        </div>

        <div className="headerContainer__right">
          {user ? (
            <Link to="/createpost">
              <Button color="inherit">Write a post</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button color="inherit">Login to Write a Post</Button>
            </Link>
          )}
          <i className="hidden-search">
            <FiSearch />
          </i>

          <i>
            <RiNotificationLine />
          </i>

          <span onClick={toggle}>
            <span onClick={toggle}>
              {user ? (
                <img
                  src="https://c0.klipartz.com/pngpicture/340/946/gratis-png-avatar-usuario-computadora-iconos-desarrollador-de-software-avatar-thumbnail.png"
                  alt="Profile Picturee"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/originals/97/21/05/972105c5a775f38cf33d3924aea053f1.jpg"
                  alt="Profile Picturee"
                />
              )}
            </span>
          </span>
        </div>
      </div>

      <div className={showMenu ? "dropdown-menu" : "dropdown-menu-close"}>
        <ul>
          <li onClick={toggle}>
            <Link to="/dashboard">
              <div className="u-name"></div>
              <small className="u-name-id">@{user?.result?.name} </small>
            </Link>
          </li>

          {user ? (
            <>
              <Link to="/createpost">
                <li onClick={toggle}>Writing a post</li>
              </Link>
              <Link to="/dashboard">
                <li onClick={toggle}>Dashboard</li>
              </Link>
              <Link href="/">
                <li
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Reading list
                </li>
              </Link>
              {/* <Link to="/updateuerinfo">
                <li onClick={toggle}>Update User Info</li>
              </Link> */}
              <li onClick={handleLogout}>LogOut</li>
            </>
          ) : (
            <Link to="/login">
              <li onClick={toggle}>Login or Create Account</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
