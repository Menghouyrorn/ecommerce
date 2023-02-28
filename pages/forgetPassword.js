import React from "react";
import { Paper, Grid, TextField, Link, Alert } from "@mui/material";
import { fireAuth } from "../services/firebase";
import { useRouter } from "next/router";



const ForgetPassword = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const handleForget = (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    fireAuth
      .sendPasswordResetEmail(email.value)
      .then((res) => {
        console.log("Go to your email");
        e.target.elements.email.value = "";
      })
      .catch((err) => {
        setError(err.message.slice(9));
        e.target.elements.email.value = "";
      });
  };
  const gotoLogin = () => {
    router.push("./login");
  };
  const gotoSigup = () => {
    router.push("./signup");
  };

  return (
    <div>
      <Paper
        elevation={5}
        style={{
          width: 300,
          height: 370,
          margin: "0 auto",
          position: "relative",
          top: "18vh",
        }}
      >
        <form
          onSubmit={handleForget}
          style={{ width: 290, height: 370, margin: "0 auto" }}
        >
          <h2
            style={{
              textAlign: "center",
              position: "relative",
              top: 5,
              fontSize: 30,
              color: "#0909FF",
              fontFamily: "Time News Roman",
            }}
          >
            Forget Password
          </h2>
          <TextField
            type="email"
            name="email"
            required
            fullWidth
            label="Email"
            placeholder="Input The Email"
            style={{ marginTop: 10, fontSize: 30 }}
          ></TextField>
          {!error ? <div></div> : <Alert severity="error">{error}</Alert>}
          <TextField
            type="submit"
            value="Forget Password"
            fullWidth
            style={{
              marginTop: 10,
              fontSize: 30,
              borderTop: "1px solid black",
              borderRadius: 5,
            }}
          ></TextField>
          <Link
            style={{ position: "relative", left: 10 }}
            onClick={() => gotoLogin()}
            underline="none"
          >
            go to login !
          </Link>
          <Link
            style={{ position: "relative", left: 90 }}
            onClick={() => gotoSigup()}
            underline="none"
          >
            Go to Signup
          </Link>
        </form>
      </Paper>
    </div>
  );
};

export default ForgetPassword;
