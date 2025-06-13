const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const connection = new Client({
  host: "localhost",
  user: "postgres",
  password: "aditya@348",
  port: 5432,
  database: "prac",
});

connection
  .connect()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
