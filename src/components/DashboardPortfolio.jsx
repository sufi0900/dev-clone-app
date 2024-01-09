import { useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getPortfoliosByUser } from "../redux/features/portfolioSlice";

import Spin from "../Spin";
import ButtonLink from "./PortfolioButton";

const DashboardPortfolio = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userPortfolios, loading } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const hasCreatedPortfolio = useSelector(
    (state) => state.portfolio.hasCreatedPortfolio
  );

  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Spin />;
  }
  // const hasPortfolio = userPortfolios?.length > 0;

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Dashboard: {user?.result?.name}
          </Typography>
          <hr style={{ maxWidth: "570px" }} />
        </Grid>
        {!hasCreatedPortfolio ? (
          <ButtonLink to="/editPortfolio" buttonText="Add Portfolio" />
        ) : (
          <ButtonLink
            to={`/editPortfolio/${userPortfolios[0]._id}`}
            buttonText="Edit Portfolio"
          />
        )}
      </Grid>
    </>
  );
};

export default DashboardPortfolio;
