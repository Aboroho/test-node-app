const mongoose = require("mongoose");
const { Schema } = mongoose;
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
};

todoSchema.statics = {
  findActive: function () {
    console.log(this);
    return this.find({ status: "active" });
  },
};

const Todo = mongoose.model("Todo", todoSchema);
const Test = new mongoose.model("Todo");

module.exports = Todo;
module.exports = Test;
