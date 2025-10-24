import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  org: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    default: [],
  },
  unverified: {
    type: [String],
    default: [],
  },
  verified: {
    type: [String],
    default: [],
  },
});

const User = model("User", userSchema);
export default User;

