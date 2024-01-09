import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPortfoliosByUser } from "../redux/features/portfolioSlice";

const FetchData = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId));
    }
  }, [dispatch, userId]);

  // Check if userPortfolios is an array and has at least one element
  const portfolio =
    Array.isArray(userPortfolios) && userPortfolios.length > 0
      ? userPortfolios[0]
      : null;

  return (
    <div>
      {user?.result?.name}
      {portfolio ? (
        <div>
          <p>Job Title: {portfolio.jobtitle}</p>
          <p>info: {portfolio.fullname}</p>
        </div>
      ) : (
        <p>User has not created their portfolio information yet.</p>
      )}
    </div>
  );
};

export default FetchData;
