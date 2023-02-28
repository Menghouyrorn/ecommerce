import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Tcard from "./card";
import { useState, useEffect, useLayoutEffect } from "react";
import { fireAuth, firestore } from "../services/firebase";
import { NewReleases } from "@material-ui/icons";

const cart = () => {
  const [cart, setCart] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [wish, setWish] = React.useState([]);
  const currentUser = fireAuth.currentUser;
  React.useEffect(() => {
    firestore.collection("Product").onSnapshot((snapshot) => {
      let datain = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(datain);
    });
  }, []);
  const handleAddCart = (data) => {
    if (currentUser) {
      let newCart = [...cart];
      let itemInCart = newCart.find((item) => data.id === item.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        itemInCart = {
          ...data,
          quantity: 1,
        };
        newCart.push(itemInCart);
      }
      setCart(newCart);
    } else {
      alert("Please Login !");
    }
  };
  useLayoutEffect(() => {
    if (localStorage.getItem("data")) {
      setCart(JSON.parse(localStorage.getItem("data")));
    } else {
      localStorage.setItem("data", JSON.stringify(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cart));
  }, [cart]);

  const handleAddWish = (data) => {
    if (!currentUser) {
      alert("Please Login !");
    } else {
      let newWhish = [...wish];
      let itemInWish = newWhish.find((item) => data.id === item.id);
      if (itemInWish) {
        itemInWish.quantity++;
      } else {
        itemInWish = {
          ...data,
          quantity: 1,
        };
        newWhish.push(itemInWish);
      }
      setWish(newWhish);
      // setWish([...wish, { ...item }]);
    }
  };
  useLayoutEffect(() => {
    if (localStorage.getItem("wish")) {
      setWish(JSON.parse(localStorage.getItem("wish")));
    } else {
      localStorage.setItem("wish", JSON.stringify(wish));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wish));
  }, [wish]);
  return (
    <>
      {data.length === 0 ? (
        <div>Don't has Product Please Add !</div>
      ) : (
        <Grid container spacing={1} style={{ padding: 20 }}>
          {data.map((item, index) => {
            return (
              <Grid key={index} item>
                <Tcard
                  ImageUrl={item.url}
                  description={item.description}
                  priceBuy={item.price}
                  name={item.name}
                  handleBuy={() => handleAddCart(item)}
                  handleWish={() => handleAddWish(item)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default cart;
