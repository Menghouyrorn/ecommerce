import { Alert, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { fireAuth, firestore } from "../services/firebase";
import { emailjs } from "@emailjs/browser";
import { Link,Button } from "@mui/material";
import { useRouter } from "next/router";
import { ContactPageOutlined } from "@mui/icons-material";

const Login = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  
  const handleSignup = (e) => {
    e.preventDefault();
    const { email, password, fname, lname } = e.target.elements;
    fireAuth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((res) => {
        alert("Create Successfull !");
        const fullname=fname.value+" "+lname.value;
        const user=fireAuth.currentUser;
        user.updateProfile({
          displayName:fullname,
        });
        firestore
          .collection("User")
          .add({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
            fristName: e.target.elements.fname.value,
            LastName: e.target.elements.lname.value,
          })
          .then((res) => {
            console.log("Add Successfull !");
          })
          .catch((err) => {
            console.log(err.message);
          });
        e.target.elements.email.value = "";
        e.target.elements.password.value = "";
        e.target.elements.fname.value = "";
        e.target.elements.lname.value = "";
        e.target.elements.cpassword.value = "";
        router.push("./login");
      })
      .catch((err) => {
        setError(err.message.slice(9));
        e.target.elements.email.value = "";
        e.target.elements.password.value = "";
        e.target.elements.fname.value = "";
        e.target.elements.lname.value = "";
        e.target.elements.cpassword.value = "";
      });
  };
  const user = fireAuth.currentUser;
  console.log(user)
  const gotoLogin = () => {
    router.push("./login");
  };
  const gotoForget = () => {
    router.push("./forgetPassword");
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Paper
          elevation={6}
          style={{
            width: "345px",
            height: "auto",
            position: "relative",
            top: 100,
            marginBottom: 50,
          }}
        >
          <form
            style={{
              height: "auto",
              width: 330,
              margin: "0 auto",
              marginBottom: 50,
            }}
            onSubmit={handleSignup}
          >
            <h3
              style={{
                textAlign: "center",
                position: "relative",
                top: 10,
                fontFamily: "Time News Roman",
              }}
            >
              Signup
            </h3>
            <Grid
              container
              spacing={1}
              style={{ position: "relative", top: 20 }}
            >
              <Grid item xs={6}>
                <TextField
                  type="text"
                  required
                  name="fname"
                  fullWidth
                  label="FristName"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  required
                  name="lname"
                  fullWidth
                  label="LastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  required
                  name="email"
                  fullWidth
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  required
                  name="password"
                  fullWidth
                  label="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  required
                  name="cpassword"
                  fullWidth
                  label="Current password"
                />
              </Grid>
              {!error ? <div></div> : <Alert severity="error">{error}</Alert>}
              <Grid item xs={12}>
                <TextField
                  type="submit"
                  fullWidth
                  label=""
                  style={{ border: "1px solid black", borderRadius: 5 }}
                />
              </Grid>
              <p>
                <Link
                  onClick={() => gotoLogin()}
                  style={{ position: "relative", left: 10 }}
                  underline="none"
                >
                  Has Account
                </Link>
              </p>
              <p>
                <Link
                  onClick={() => gotoForget()}
                  style={{ position: "relative", left: 100 }}
                  underline="none"
                >
                  For get password
                </Link>
              </p>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
