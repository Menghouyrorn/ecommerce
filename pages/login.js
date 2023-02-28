import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Link,
  Typography,
  Alert,
  Dialog,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fireAuth } from "../services/firebase";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  // const classes=useStyle();
  const handleSigin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    fireAuth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((res) => {
        if (
          email.value === "admin@gmail.com" &&
          password.value === "admin1234"
        ) {
          e.target.elements.email.value = "";
          e.target.elements.password.value = "";
          e.target.elements.fname.value = "";
          console.log("Admin Sign Successfull !");
          router.push("./adminpage");
        } else {
          e.target.elements.email.value = "";
          e.target.elements.password.value = "";
          e.target.elements.fname.value = "";
          console.log("Sign Successfull !");
          router.push("/");
        }
      })
      .catch((err) => {
        setError(err.message.slice(9));
        e.target.elements.email.value = "";
        e.target.elements.password.value = "";
        e.target.elements.fname.value = "";
      });
  };

  const gotoSigup = () => {
    router.push("./signup");
  };
  const gotoForget = () => {
    router.push("./forgetPassword");
  };
  return (
    <div>
      <Grid container justifyContent="center">
        <Paper
          elevation={4}
          style={{
            width: 350,
            height: "auto",
            position: "relative",
            top: "25vh",
            marginBottom: 50,
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginTop: 10,
              fontFamily: "Tiem News Roman",
            }}
          >
            Login
          </h3>
          <form
            onSubmit={handleSigin}
            style={{
              height: "auto",
              width: 330,
              margin: "0 auto",
              marginBottom: 50,
            }}
          >
            <TextField
              type="text"
              name="fname"
              required
              fullWidth
              placeholder="Enter the Name of the User"
              label="Full Name"
              style={{ marginTop: 10 }}
              variant="outlined"
            ></TextField>
            <TextField
              type="email"
              name="email"
              required
              fullWidth
              placeholder="Enter the Email"
              variant="outlined"
              label="Email"
              style={{ marginTop: 10 }}
            ></TextField>
            <TextField
              type="password"
              name="password"
              required
              fullWidth
              placeholder="Enter the Password"
              variant="outlined"
              label="Password"
              style={{ marginTop: 10 }}
            ></TextField>
            {!error ? <div></div> : <Alert severity="error">{error}</Alert>}
            <TextField
              type="submit"
              fullWidth
              style={{
                marginTop: 10,
                borderTop: "1px solid black",
                borderRadius: 5,
              }}
            >
              Submit
            </TextField>
            <Link
              onClick={() => gotoSigup()}
              style={{ position: "relative", left: 10 }}
              underline="none"
            >
              Don't has Account !
            </Link>
            <Link
              onClick={() => gotoForget()}
              style={{ position: "relative", left: 70 }}
              underline="none"
            >
              forgetPassword !
            </Link>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
