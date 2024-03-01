const Cricketer = require("../models/cricketer");
const Sequelize = require("sequelize");

exports.getSchedulepage = async (request, response, next) => {
  await response.sendFile("index.html", { root: "views" });
};

exports.postAddIndex = async (req, res, next) => {
  try {
    const name = req.body.name;
    const dob = req.body.dob;
    const photoUrl = req.body.photoUrl;
    const birthplace = req.body.birthplace;
    const career = req.body.career;
    const noOfMatches = req.body.noOfMatches;
    const score = req.body.score;
    const fifties = req.body.fifties;
    const centuries = req.body.centuries;
    const wickets = req.body.wickets;
    const average = req.body.average;
    const data = await Cricketer.create({
      name: name,
      dob: dob,
      photoUrl: photoUrl,
      birthplace: birthplace,
      career: career,
      numberOfMatches: noOfMatches,
      score: score,
      fifties: fifties,
      centuries: centuries,
      wickets: wickets,
      average: average,
    });
    res.status(201).json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchCricketerByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
    }
    const cricketers = await Cricketer.findAll({
      where: {
        name: { [Sequelize.Op.like]: `%${name}%` },
      },
    });
    res.status(200).json(cricketers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
