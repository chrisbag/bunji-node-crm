const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const { sendWelcomeEmail } = require("../emails/account");

router.post("/api/v1/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const accessToken = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.prenom);
    res.status(201).send({ user, accessToken });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const accessToken = await user.generateAuthToken();
    res.send({ user, accessToken });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/api/v1/users/logout", auth, async (req, res) => {
  try {
    req.user.accessTokens = req.user.accessTokens.filter((accessToken) => {
      return accessToken.accessToken !== req.accessToken;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/api/v1/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.accessTokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/api/v1/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/api/v1/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/v1/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
