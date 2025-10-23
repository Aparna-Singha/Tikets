import { model, Schema } from "mongoose";

const orgSchema = new Schema({
  orgId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  ticketCount: {
    type: Number,
    default: 0,
  }
});

const Org = model("Org", orgSchema);
export default Org;

