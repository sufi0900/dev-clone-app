import { Vortex } from "react-loader-spinner";
import Grid from "@mui/material/Grid";

const Spin = () => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      id="Portfolio"
    >
      {" "}
      <div className=" flex justify-center items-center text-center ">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={[
            "#3b49df",
            "#3b49df",
            "#3b49df",
            "#3b49df",
            "#3b49df",
            "#3b49df",
          ]}
        />
        <br />
        <h2>Loading...</h2>
      </div>
    </Grid>
  );
};

export default Spin;
