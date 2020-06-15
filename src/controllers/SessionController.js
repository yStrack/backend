const User = require("../models/User");
const gfs = require("multer-gridfs-storage");
const multer = require("multer");

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    const { password } = req.body; // password is randomly generated
    const { name } = req.body;

    let user = await User.findOne({ email });

    // if User does not exists
    if (!user) {
      user = await User.create({
        email,
        password,
        name,
        image: "null",
      });
    }
    return res.status(200).json(User);
  },

  async authenticate(req, res) {
    if (req.body.email === "" || req.body.password === "") {
      return res.status(400).json({ message: "Empty email or password" });
    }
    const email = req.body.email;
    const password = req.body.password;
    await User.find({ email: email, password: password }, (err, user) => {
      if (err) {
        return res.json({ message: err });
      }
      if (user === undefined || user.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }
      return res.status(200).json(user[user.length - 1]);
    });
  },

  async update(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const { filename } = req.file;

    User.findOneAndUpdate(
      { email: email, password: password },
      { image: filename },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.status(200).json(doc);
      }
    );

    // return res.status(200).json({ message: "Update sucess" });
  },
};
