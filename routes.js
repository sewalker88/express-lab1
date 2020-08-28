"use strict";
const express = require("express");
const routes = express.Router();

const cartItems = [
  { id: 1, product: "eggs", price: 1.5, quantity: 12 },
  { id: 2, product: "milk", price: 2.5, quantity: 2 },
  { id: 3, product: "chips", price: 3.0, quantity: 4 },
  { id: 4, product: "water", price: 4.5, quantity: 24 },
];
let nextId = 5;

routes.get("/cartItems", (req, res) => {
  if (req.query.maxPrice) {
    let filteredArray = cartItems.filter((cartItems) => {
      return cartItems.price <= parsefloat(req.query.maxPrice);
    });
    res.json(filteredArray);
  } else if (req.query.prefix) {
    let filteredArray = cartItems.filter((cartItems) => {
      return cart - item.product.startsWith(req.query.prefix.toLowerCase());
    });

    res.json(filteredArray);
  } else if (req.query.pageSize) {
    let results = cartItems.slice(0, parseInt(req.query.pageSize));
    res.json(results);
  }
});

routes.get("/cartItems/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let found = cartItems.find((cartItems) => {
    return cartItems.id === id;
  });
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.send(`iD ${id} not found`);
  }
});

routes.post("/cartItems", (req, res) => {
  const cartItems = req.body;
  cartItems.id = nextId++;
  cartItems.push(cartItems);
  res.status(201);
  res.json(cartItems);
});

routes.put("/cartItems/:id", (req, res) => {
  let id = req.params.id;
  let index = cartItems.findIndex((cartItems) => {
    return cartItems.id === id;
  });
  cartItems[index] = req.body;
  cartItems[index].id = id;
  res.send(200);
  res.json(cartItems[index]);
});

routes.delete("/cartItems/:id", (req, res) => {
  let id = req.pararams.id;
  let index = cartItems.findIndex((cartItems) => {
    return cartItems.id === id;
  });
  cartItems.splice(index, 1);
  res.sendStatus(204);
});
module.exports = routes;
