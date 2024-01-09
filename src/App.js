import React from "react";
import "./App.scss";
import "./index.css";
import Navigation from "./components/Navigation";
import LeftSidebar from "./components/LeftSidebar";
import Content from "./components/Content";
import RightSidebar from "./components/RightSidebar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { checkSession } from "./redux/features/authSlice";
import PostContent from "./components/postdetail";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/createpost";
import Dashboard from "./components/Dashboard";
import UserDetail from "./components/userdetail";
import AddEditPortfolio from "./AddEditPortfolio";
// import Code from "./Code";
import DashboardPortfolio from "./components/DashboardPortfolio";
import UpdateUserInfoForm from "./components/UpdateUser";
import FetchData from "./components/FetchData";
// import PortfolioForm from "./components/PortfolioForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [mobileMenu, setmobileMenu] = useState(false);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };
  const dispatch = useDispatch();
  // Dispatch checkSession action on app start or user interactions (e.g., onClick, useEffect)
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <>
      <ToastContainer />

      <Navigation />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <main className="main-container">
              <LeftSidebar burgerMenu={mobileMenu} closeMenu={toggle} />
              <Content />

              {/* <RightSidebar /> */}
            </main>
          }
        />

        <Route path="/fetch" element={<FetchData />} />
        <Route path="/updateuerinfo" element={<UpdateUserInfoForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/updateuserinfo" element={<DashboardPortfolio />} /> */}

        {/* <Route path="/editPortfolio/:id" element={<AddEditPortfolio />} /> */}
        {/* <Route path="/addPortfolio" element={<AddEditPortfolio />} /> */}
        <Route path="/editPortfolio/:id?" element={<AddEditPortfolio />} />

        <Route path="/dashboardportfolio" element={<DashboardPortfolio />} />
        {/* <Route path="/editPortfolio/:id" element={<AddEditPortfolio />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="register" element={<Register />} />
        <Route path="user" element={<UserDetail />} />
        <Route path="/editTour/:id" element={<CreatePost />} />
        <Route path="/tour/:id" element={<PostContent />} />
      </Routes>
    </>
  );
}

export default App;
