const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: String,
    name: {
      type: String,
      required: true,
    },
    image: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("image_url").get(function () {
  return `https://lavanda-backend.herokuapp.com/files/${this.image}`;
  // return `http://localhost:3333/files/${this.image}`;
});

module.exports = mongoose.model("User", UserSchema);
