const express = require("express"); //importing express

const app = express(); //created server instance 

app.get("/", (req, res) => {
  res.send("Hello this is the home page");
});

app.get("/about", (req, res) => {
  res.send("Hello this is the about page");
});

app.get("/products", (req, res) => {
  res.send("Hello this is the products page");
});

app.listen(3000); //server started at port 3000


//npx nodemon [serverfile] -> alternative of node [serverfile] Purpose: to start server automatically restarts server using the original command

//npm (package manager) vs npx (package executioner)