const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(500).json({ msg: "no auth header" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      console.log(err);
      res.status(500).json({ msg: "something went wrong" });
    }
  });

  // const decoded = jwt.verify(token, process.env.SECRET);
  // if (Object.keys(decoded).length === 0) {
  //   res.status(500).json({ msg: "unauth header" });
  // }
  // req.user = decoded;
  // next();
};

module.exports = authMiddleWare;
