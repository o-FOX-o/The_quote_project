const express = require("express");
const port = process.env.PORT || 3000;
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.json());
const apiRouter = require("./route/apiRoute");

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`The quotes project Server has started on port:${port}`);
});
