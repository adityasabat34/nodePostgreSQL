import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development", // if env_NODE_ENV is not development, then secure is true
  });

  return token;
};

export default generateToken;
