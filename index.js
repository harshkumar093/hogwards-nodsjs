const express = require("express");
const { ResponseMessage } = require("./util/Constants");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res
    .status(301)
    .json(ResponseMessage(301, "Welcome to Hogwards data repo.", {}));
});

app.get("/houses", (req, res) => {
  try {
    const { house } = req.query;
    if (!house) {
      res
        .status(404)
        .json(
          ResponseMessage(
            404,
            "Please add house name in query to find the house",
            null
          )
        );
    }
    const houses = JSON.parse(fs.readFileSync("./database/houses.json"));

    if (!houses) {
      res
        .status(500)
        .json(ResponseMessage(500, "Houses database not found.", null));
    }

    let response = houses.filter((itemHouse) => itemHouse.name == house)[0];
    if (response) {
      res
        .status(200)
        .json(
          ResponseMessage(200, "Found the house details successfully", response)
        );
    } else {
      res.status(404).json(ResponseMessage(404, "House not found.", null));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseMessage(500, "Internal Server Error", error));
  }
});

app.listen(8000, () => {
  console.log("Server started at localhost:8000");
});
