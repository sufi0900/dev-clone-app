import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import PortfolioReducer from "./features/portfolioSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    portfolio: PortfolioReducer,
  },
});
