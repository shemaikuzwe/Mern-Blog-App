const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.AUTH_SECRET;
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      throw Error("User doesn't exist");
    }
    const checkPassword = await bcrypt.compare(
      password.toString(),
      checkUser.password
    );
    if (!checkPassword) {
      res.status(404).json({ message: "Invalid password" });
    }
    const user = { username: checkUser.username, email: checkUser.email };
    const token = await jwt.sign(user, secret, { expiresIn: "1h" });
    req.user = token;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "authenticated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const checkEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) return true;
  return false;
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (await checkEmail(email)) {
      throw Error("Email already exists");
    }
    const hashPassword = await bcrypt.hash(password.toString(), 10);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashPassword,
    });
    if (newUser) {
      const user = { username: newUser.username, email: newUser.email };
      const token = await jwt.sign(user, secret, { expiresIn: "1h" });
      req.user = token;
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "user registered successfuly" });
    }
    throw new Error("User not added");
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: e.message });
    }
  }
};
const checkAuth = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    res.status(500).json({ message: "Invalid token" });
  }
};
const session = async (req, res) => {
  return res.status(200).json(req.user);
};
const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "user logged out" });
};
module.exports = { login, register, checkAuth, session, logout };
