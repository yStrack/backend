const User = require("../models/User");

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
      if (User.length == 0) {
        return res.status(400).json({ message: "User not found" });
      }
      return res.status(200).json({ name: user[0].name });
    });
  },
};
