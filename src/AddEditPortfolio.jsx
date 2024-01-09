import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Container,
} from "@mui/material";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  updatePortfolio,
} from "./redux/features/portfolioSlice";
import Divider from "@mui/material/Divider";
import FileBase from "react-file-base64";
import "react-quill/dist/quill.snow.css";

const initialState = {
  fullname: "",
  jobtitle: "",
  homeinfo: "",
  github: "",
  facebook: "",
  twitter: "",
  aboutinfo: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    fullname: "",
    jobtitle: "",
    homeinfo: "",
    github: "",
    facebook: "",
    twitter: "",
    aboutinfo: "",
    email: "",
    phone: "",
    address: "",
  });
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setPortfolioData((prevData) => ({ ...prevData, email: value }));
    validateEmail(value);
  };
  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    homeinfo,
    fullname,
    jobtitle,
    github,
    facebook,
    twitter,
    email,
    phone,
    address,
  } = portfolioData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPortfolioData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  useEffect(() => {
    if (id && userPortfolios) {
      const singlePortfolio = userPortfolios.find(
        (portfolio) => portfolio._id === id
      );

      if (singlePortfolio) {
        setPortfolioData(singlePortfolio);
      }
    }
  }, [id, userPortfolios]);

  const handleSubmit = (e) => {
    e.preventDefault();

    {
      const updatedPortfolioData = {
        ...portfolioData,
        name: user?.result?.name,
      };

      if (!id) {
        dispatch(createPortfolio({ updatedPortfolioData, navigate, toast }));
      } else {
        dispatch(
          updatePortfolio({ id, updatedPortfolioData, toast, navigate })
        );
      }
    }
  };

  ////////////////////////
  const handleClear = () => {
    setPortfolioData({ ...initialState }); // Reset state
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>
              {" "}
              Dashboard: {user?.result?.name} <br />
              {id ? "Update Portfolio" : "Add Portfolio"}
            </h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  name="fullname"
                  value={fullname}
                  multiline
                  onChange={onInputChange}
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
                  label="Email Address"
                  name="email"
                  value={email}
                  fullWidth
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? "Enter a valid email address" : ""}
                  inputProps={{
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                  }}
                  InputProps={{
                    className: "custom-input-color",
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
                  label="DOB"
                  name="homeinfo"
                  value={homeinfo}
                  onChange={onInputChange}
                  fullWidth
                  type="date"
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
                  label="Website Link"
                  name="jobtitle"
                  value={jobtitle}
                  type="url"
                  onChange={onInputChange}
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
                  label="Education"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  fullWidth
                  multiline
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
                  label="ProNoun"
                  name="address"
                  value={address}
                  onChange={onInputChange}
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
                  label="Work"
                  name="github"
                  value={github}
                  multiline
                  onChange={onInputChange}
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
                  label="Skills"
                  name="facebook"
                  multiline
                  value={facebook}
                  onChange={onInputChange}
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
              {/* <Grid item xs={12}>
                <TextField
                  label="Twitter Link"
                  name="twitter"
                  value={twitter}
                  onChange={onInputChange}
                  fullWidth
                  type="url"
                  
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
              </Grid> */}
              <Divider />
              <Grid item xs={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPortfolioData({ ...portfolioData, imageFile2: base64 })
                  }
                />

                {portfolioData.imageFile2 ? ( // Display image preview only if imageFile2 is present
                  <img
                    src={portfolioData.imageFile2}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "gray" }}>
                    Upload your picture
                  </p>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPortfolioData({ ...PortfolioData, imageFile3: base64 })
                  }
                />

                {PortfolioData.imageFile3 ? ( // Display image preview only if imageFile2 is present
                  <img
                    src={PortfolioData.imageFile3}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "gray" }}>
                    Upload your logo
                  </p>
                )}
              </Grid> */}
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  {id ? "Update" : "Submit"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddEditPortfolio;
