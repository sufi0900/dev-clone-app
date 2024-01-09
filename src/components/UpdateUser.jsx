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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistrationInfo } from "../redux/features/authSlice";
import Divider from "@mui/material/Divider";
// import FileBase from "react-file-base64";
import Avatar from "@mui/material/Avatar";
const initialState = {
  firstName: "",
  lastName: "",
};

const UpdateUserInfoForm = () => {
  const [userData, setUserData] = useState({ ...initialState });
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, image } = userData;

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName && lastName) {
      const updatedInfo = {
        firstName,
        lastName,
        image,
      };

      dispatch(updateRegistrationInfo({ updatedInfo, navigate, toast }));
    }
  };

  useEffect(() => {
    // Populate the form with the current user's data only if the state is not already populated
    if (!userData.firstName && !userData.lastName) {
      setUserData((prevData) => ({
        ...prevData,
        firstName: user?.result?.name.split(" ")[0] || "",
        lastName: user?.result?.name.split(" ")[1] || "",
      }));
    }
  }, [user, userData.firstName, userData.lastName]);

  const handleClear = () => {
    setUserData({ ...initialState }); // Reset state
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>Update User Information</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Avatar src={user?.result?.image} alt="userpic" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={onInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  fullWidth
                  required
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setUserData({ ...userData, image: base64 })
                  }
                />

                {userData.image ? (
                  <img
                    src={userData.image}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "gray" }}>
                    Change your picture
                  </p>
                )}
              </Grid> */}
              <Divider />

              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Update
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

export default UpdateUserInfoForm;
