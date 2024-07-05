const express = require("express");
const { ResponseMessage } = require("./util/Constants");
const path = require("path");
const routerHouseController = require("./house/house.controller");
const routerCandidateController = require("./candidate/candidate.controller");

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/houses", routerHouseController);
app.use("/api/candidate", routerCandidateController);

app.get("/api/", (req, res) => {
  res
    .status(301)
    .json(ResponseMessage(301, "Welcome to Hogwards data repo.", {}));
});

app.listen(8000, () => {
  console.log("Server started at localhost:8000");
});
