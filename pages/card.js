import React from "react";
import {
  Card,
  Link,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  Paper,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stylec from "../styles/card.module.css";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: 200,
    cursor: "pointer",
  },
  root: {
    minWidth: "auto",
  },
}));

const layout = {
  position: "relative",
  top: 20,
};
const buttonStyle = {
  margin: "auto",
  cursor: "pointer",
  height:100
};

const card = ({
  ImageUrl,
  description,
  priceBuy,
  handleBuy,
  handleWish,
  name,
}) => {
  const classes = useStyles();

  const [show, setShow] = React.useState(false);
  const handelOver = () => {
    setShow(true);
  };
  const handleLeave = () => {
    setShow(false);
  };
  return (
    <div className={classes.root} style={layout}>
      <Paper className={Stylec.paper}>
        <Card
          className={classes.cardlayout}
          onMouseOver={handelOver}
          onMouseLeave={handleLeave}
        >
          <CardActionArea>
            <CardMedia
              className={classes.image}
              image={ImageUrl}
              style={{ height: 200, width: 250 }}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ color: "green" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Typography style={{ color: "red" }}>
                {"$" + " " + priceBuy}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions style={buttonStyle}>
            {show ? (
              <div>
                <IconButton onClick={handleWish}>
                  <FavoriteBorderIcon />
                </IconButton>{" "}
                <IconButton onClick={handleBuy}>
                  <ShoppingCartIcon />
                </IconButton>
              </div>
            ) : (
              <div></div>
            )}
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
};

export default card;
