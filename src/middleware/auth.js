const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "accessTokens.accessToken": accessToken,
    });

    if (!user) {
      throw new Error();
    }

    req.accessToken = accessToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
