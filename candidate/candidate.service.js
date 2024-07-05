const fs = require("fs");
const { ResponseMessage } = require("../util/Constants");

const getCandidatesFromCandidateName = (candidateName) => {
  const candidateDB = JSON.parse(fs.readFileSync("./database/candidates.json"));
  let responseGetCandadate = candidateDB.filter((item) => {
    const filteredCandidate = item.candidate.filter(
      (itemCandidateName) => itemCandidateName == candidateName
    );
    return filteredCandidate.length > 0 ? true : false;
  })[0];
  return responseGetCandadate;
};

const getHouseFromHouseName = (houseName) => {
  const houseDB = JSON.parse(fs.readFileSync("./database/houses.json"));
  return houseDB.filter((item) => {
    return item.name == houseName;
  })[0];
};

const getCandidateByCandidateName = (res, candidateName) => {
  let responseGetCandadate = getCandidatesFromCandidateName(candidateName);
  let house = getHouseFromHouseName(responseGetCandadate.name);

  let payload = {
    candidate: responseGetCandadate.candidate,
    house,
  };
  res.status(200).json(payload);
};

const getHouseFromHouseNameAsync = async (houseName) => {
  return fs.readFile("./database/houses.json", (err, data) => {
    if (!err) {
      data = JSON.parse(data);
      console.log(data);
      let houseRes = data.filter((item) => item.name == houseName)[0];
      console.log(houseRes);
      return new Promise((res, rej) => res(houseRes));
    } else {
      console.log(err);
    }
  });
};

const getHouseFromHouseNameAsync2 = async (houseName) => {
  let getCandidatePromise = fs.promises.readFile("./database/houses.json");
  return getCandidatePromise
    .then((data) => {
      data = JSON.parse(data.toString());
      return data.filter((item) => item.name == houseName)[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCandidateByHouseNameAsync = async (houseName) => {
  let getCandidatePromise = fs.promises.readFile("./database/candidates.json");
  return getCandidatePromise
    .then((data) => {
      data = JSON.parse(data.toString());
      return data.filter((item) => item.name == houseName)[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

const getHouseByHouseName = async (res, houseName) => {
  const startTime = new Date();
  let house = getHouseFromHouseNameAsync2(houseName); // await
  let candidates = getCandidateByHouseNameAsync(houseName); //await
  let house1 = getHouseFromHouseNameAsync2(houseName); // await
  let candidates1 = getCandidateByHouseNameAsync(houseName); //await
  let house2 = getHouseFromHouseNameAsync2(houseName); // await
  let candidates2 = getCandidateByHouseNameAsync(houseName); //await
  let house3 = getHouseFromHouseNameAsync2(houseName); // await
  let candidates3 = getCandidateByHouseNameAsync(houseName); //await
  const endTime = new Date();

  const [
    houseRes,
    candidatesRes,
    house1Res,
    house2Res,
    house3Res,
    candidates1Res,
    candidates2Res,
    candidates3Res,
  ] = await Promise.all([
    house,
    candidates,
    house1,
    house2,
    house3,
    candidates1,
    candidates2,
    candidates3,
  ]);

  console.log(
    `startTime: ${startTime} \nendTime: ${endTime} \n diff: ${
      endTime - startTime
    }`
  );

  let payload = {
    success: true,
    houseRes,
    candidatesRes,
  };
  res.status(200).json(payload);
};

module.exports = {
  getCandidateByCandidateName,
  getHouseByHouseName,
};
