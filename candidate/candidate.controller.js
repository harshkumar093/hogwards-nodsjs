const express = require("express");
const { ResponseMessage } = require("../util/Constants");
const {
  getCandidateByCandidateName,
  getHouseByHouseName,
} = require("./candidate.service");
const routerCandidateController = express.Router();

routerCandidateController.get("", (req, res) => {
  try {
    const { candidateName } = req.query;
    console.log(candidateName);
    getCandidateByCandidateName(res, candidateName);
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseMessage(500, "Internal Server Error", error));
  }
});

routerCandidateController.get("/house", (req, res) => {
  try {
    const { houseName } = req.query;
    console.log(houseName);
    getHouseByHouseName(res, houseName);
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseMessage(500, "Internal Server Error", error));
  }
});

module.exports = routerCandidateController;
