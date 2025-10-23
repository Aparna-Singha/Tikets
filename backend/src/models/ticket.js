import { model, Schema } from "mongoose";

const ticketSchema = new Schema({
  orgId: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  author: {
    type: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  status: {
    type: String,
    enum: [
      "draft",
      "moderation",
      "raised",
      "stale",
      "acknowledged",
      "progressing",
      "resolved",
      "skipped",
      "redacted",
    ],
    default: "draft",
  },
  tags: [{ type: String }],
  timeline: [{
    timestamp: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  }],
  votes: {
    type: {
      plus: {
        type: Number,
        default: 0,
      },
      minus: {
        type: Number,
        default: 0,
      },
    },
    default: { plus: 0, minus: 0 },
  }
});

const Ticket = model("Ticket", ticketSchema);
export default Ticket;

