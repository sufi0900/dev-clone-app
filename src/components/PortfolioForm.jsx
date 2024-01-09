import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createPortfolio,
  updatePortfolio,
} from "../redux/features/portfolioSlice";

import { TextField, Button, Grid } from "@mui/material";

const PortfolioForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    jobtitle: "",
    // other form fields...
  });

  const { userPortfolios } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // If userPortfolios exist, populate the form with the existing data
    if (userPortfolios && userPortfolios.length > 0) {
      const firstPortfolio = userPortfolios[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        fullname: firstPortfolio.fullname || "",
        jobtitle: firstPortfolio.jobtitle || "",
        // map other form fields accordingly...
      }));
    }
  }, [userPortfolios]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if userPortfolios exist to determine whether to add or update
    if (userPortfolios && userPortfolios.length > 0) {
      // If userPortfolios exist, update the portfolio
      const portfolioId = userPortfolios[0]._id;
      dispatch(updatePortfolio({ id: portfolioId, data: formData }));
    } else {
      // If userPortfolios don't exist, add a new portfolio
      dispatch(createPortfolio(formData));
    }

    // Optionally, you can redirect the user after submission
    navigate("/dashboardportfolio");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={(e) =>
            setFormData({ ...formData, fullname: e.target.value })
          }
          fullWidth
          InputProps={{
            className: "custom-input-color", // Apply your custom class here
          }}
          InputLabelProps={{
            className: "custom-input-color",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Job title"
          name="jobtitle"
          value={formData.jobtitle}
          onChange={(e) =>
            setFormData({ ...formData, jobtitle: e.target.value })
          }
          fullWidth
          InputProps={{
            className: "custom-input-color", // Apply your custom class here
          }}
          InputLabelProps={{
            className: "custom-input-color",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
      </Grid>

      <Button type="submit">Submit Portfolio</Button>
    </form>
  );
};

export default PortfolioForm;
