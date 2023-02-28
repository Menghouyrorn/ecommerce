import { Paper, Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import stylec from "../styles/footer.module.css";

const footer = () => {
  const text1 =
    " Computers have become essential business tools. They are used in every aspect of a company's operations, including product creation, marketing, accounting and administration. It is critical that business owners take the time to choose the right computers, software and peripherals for their organization.";
  return (
    <>
      <Paper
        elevation={6}
        style={{ width: "100%", height: "auto", marginTop: 100 }}
      >
        <Paper
          elevation={6}
          style={{ width: "100%", height: 40, background: "#6495ED" }}
        ></Paper>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div>
              <h3 className={stylec.text}>Content</h3>
              <p style={{ padding: 10 }}>{text1}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <h3 className={stylec.text}>Creat By</h3>
              <div style={{ padding: 10 }}>
                <p>Rorn Menghouy</p>
                <p>
                  By use html css material ui nextjs reactjs firebase emailjs
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={stylec.img}>
              <h3 className={stylec.text}>Contect Me</h3>
              <div>
                <div>
                  <p>
                    Email :{" "}
                    <span className={stylec.email}>menghouyrorn@gmail.com</span>{" "}
                  </p>
                </div>
                <div>
                  <p>
                    Phone Number :{" "}
                    <span className={stylec.email}>069361307</span>
                  </p>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    padding: 6,
                    position: "relative",
                    top: 4,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    style={{ width: 40, height: 40 }}
                  ></img>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    padding: 6,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/640px-Telegram_2019_Logo.svg.png"
                    style={{ width: 40, height: 40, marginTop: 10 }}
                  ></img>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    padding: 6,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                    style={{ width: 40, height: 40, marginTop: 10 }}
                  ></img>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    padding: 6,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png"
                    style={{ width: 40, height: 40, marginTop: 10 }}
                  ></img>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Paper
          elevation={6}
          style={{ width: "100%", height: 40, background: "#6495ED" }}
        ></Paper>
      </Paper>
    </>
  );
};

export default footer;
