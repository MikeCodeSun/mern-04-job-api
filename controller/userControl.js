const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(500).json({ msg: "no name or password or email, plz input " });
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    res
      .status(500)
      .json({ msg: "sorry, user already exist, please login or change email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = {
    name,
    email,
    password: hashPassword,
  };
  console.log(newUser);

  const user = await User.create(newUser);

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ msg: "register", user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({ msg: "no email or password, plz type them" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(500).json({ msg: "no user, please register first" });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    res.status(500).json({ msg: "wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ msg: "login", user, token });
};

module.exports = { register, login };
