import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

const Payament = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={4}>
          <h5 style={{ padding: 10 }}> Billing Detail </h5>{" "}
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField label="First Name" fullWidth>
                {" "}
              </TextField>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <TextField label="Last Name" fullWidth>
                {" "}
              </TextField>{" "}
            </Grid>{" "}
          </Grid>{" "}
          <p style={{ padding: "0px 10px" }}> Country / Region </p>{" "}
          <p style={{ padding: "0px 20px" }}> Cambodia </p>{" "}
          <p style={{ padding: "0 10px" }}>Address 1</p>
          <Grid item xs={12} md={12}>
            <TextField
              label="Home Number and Street Name "
              fullWidth
            ></TextField>
          </Grid>
          <p style={{ padding: "0 10px" }}>Address 2 (optional)</p>
          <Grid item xs={12} md={12}>
            <TextField
              label="Apartment,suite,unit etc (optional)"
              fullWidth
            ></TextField>
          </Grid>
          <p style={{ padding: "3px 10px" }}>Khan</p>
          <Grid item xs={12} md={12}>
            <TextField label="Khan" fullWidth></TextField>
          </Grid>
          <p style={{ padding: "3px 10px" }}>Sangkat</p>
          <Grid item xs={12} md={12}>
            <TextField label="SangKat" fullWidth></TextField>
          </Grid>
          <p style={{ padding: "3px 10px" }}>City</p>
          <Grid item md={12} xs={12}>
            <TextField label="City" fullWidth></TextField>
          </Grid>
          <p style={{ padding: "3px 10px" }}>PhoneNumber</p>
          <Grid item xs={12} md={12}>
            <TextField label="PhoneNumber" fullWidth></TextField>
          </Grid>
          <p style={{ padding: "3px 10px" }}>Email Address</p>
          <Grid item xs={12} md={12}>
            <TextField label="Email Address" fullWidth></TextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField></TextField>
          </Grid>
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <p> Text </p>{" "}
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <p> Text </p>{" "}
        </Grid>{" "}
      </Grid>{" "}
    </div>
  );
};

export default Payament;
