const fs = require("fs");
const { ResponseMessage } = require("../util/Constants");

const getHouseByHouseName = (houseName) => {
  if (!houseName) {
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

  let response = houses.filter((itemHouse) => itemHouse.name == houseName)[0];
  if (response) {
    res
      .status(200)
      .json(
        ResponseMessage(200, "Found the house details successfully", response)
      );
  } else {
    res.status(404).json(ResponseMessage(404, "House not found.", null));
  }
};


const addhouse = (house, founder, animal, element) => {
  const addhouse = JSON.parse(fs.readFileSync("./database/houses.json"));
  let houseitem = {
    house: house,
    founder: founder,
    animal: animal,
    element: element,
  };
  addhouse.push(houseitem);
  console.log(addhouse);
  fs.writeFile("./database/houses.json", JSON.stringify(addhouse), () => {
    console.log("File got updated");
  })
  res.status(200).json(ResponseMessage(200, "Success"));
}

module.exports = {
  getHouseByHouseName,
  addhouse,
};
