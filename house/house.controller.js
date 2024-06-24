const express = require("express");
const { ResponseMessage } = require("../util/Constants");
const routerHouseController = express.Router();
const { getHouseByHouseName } = require("./house.service");

routerHouseController.get("", (req, res) => {
  try {
    const { house } = req.query;
    getHouseByHouseName(house);
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseMessage(500, "Internal Server Error", error));
  }
});

routerHouseController.post("", (req, res) => {
  try {
    console.log(req.query, req.body);
    const { house } = req.query;
    const { founder, animal, element } = req.body;
    console.log(house, founder, animal, element);
    res.json(ResponseMessage(200, "Success"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseMessage(500, "Internal Server Error", error));
  }
});

module.exports = routerHouseController;
