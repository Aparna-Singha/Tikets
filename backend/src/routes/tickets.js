import { Router } from "express";

import Ticket from "#models/ticket.js";
import Org from "#models/org.js";
import User from "#models/user.js";

const ticketRouter = Router();

ticketRouter.get("/:orgId/all", async (req, res) => {
  const { orgId } = req.params;
  const tickets = await Ticket.find({ orgId })
    .where("status")
    .nin([
      "moderation",
      "draft",
      "redacted",
      "skipped",
      "resolved"
    ]);

  return res.status(200).json(tickets);
});

ticketRouter.get("/:orgId/status/:status", async (req, res) => {
  const { orgId, status } = req.params;
  const allowedStatuses = [
    "raised",
    "acknowledged",
    "progressing",
    "stale",
    "resolved",
    "skipped",
  ];

  if (!allowedStatuses.includes(status))
    return res.status(400).json({
      message: "Invalid status"
    });

  const tickets = await Ticket.find({ orgId, status });
  return res.status(200).json(tickets);
});

ticketRouter.get("/:orgId/moderation", async (req, res) => {
  const { orgId } = req.params;
  const { user: userProxy } = req;

  if (!userProxy)
    return res.status(401).json({
      message: "Authentication required"
    });

  const { email } = userProxy;
  const user = await User.findOne({ email });

  const allowModeration = [
    user.permissions.includes("moderate"),
    user.permissions.includes("super-admin"),
  ];
  
  if (!allowModeration.some(p => !!p))
    return res.status(403).json({
      message: "Access denied"
    });
  
  const tickets = await Ticket.find({ orgId, status: "moderation" });
  return res.status(200).json(tickets);
});

ticketRouter.post("/:orgId", async (req, res) => {
  if (!req.user) return res.status(401).json({
    message: "Authentication required"
  });
  
  const { orgId } = req.params;

  let org = await Org.findOne({ orgId });
  if (!org) org = new Org({
    orgId,
    name: orgId,
    domain: orgId,
    ticketCount: 0,
  });
  
  const ticket = new Ticket({
    orgId,
    ticketId: org.ticketCount + 1,
    title: `Please Rename This Ticket`,
    description: `Please update this sample description for Ticket.`,
    author: {
      id: req.user.email,
      name: req.user.name,
    }
  });
  
  await ticket.save();
  
  org.ticketCount += 1;
  await org.save();

  return res.status(201).json(ticket);
});

ticketRouter.get("/:orgId/ticket/:ticketId", async (req, res) => {
  const { orgId, ticketId } = req.params;
  const ticket = await Ticket.findOne({ orgId, ticketId });
  
  if (!ticket) return res.status(404).json({
    message: "Ticket not found"
  });

  if (["draft", "redacted"].includes(ticket.status)) {
    if (!req.user) return res.status(401).json({
      message: "Authentication required"
    });

    if (ticket.author.id !== req.user.email)
      return res.status(403).json({
        message: "Access denied"
      });
  }

  return res.status(200).json(ticket);
});

ticketRouter.put("/:orgId/ticket/:ticketId", async (req, res) => {
  if (!req.user) return res.status(401).json({
    message: "Authentication required"
  });

  const { orgId, ticketId } = req.params;
  
  const { updates } = req.body;
  const ticket = await Ticket.findOne({ orgId, ticketId });
  
  if (!ticket) return res.status(404).json({
    message: "Ticket not found"
  });

  const { email } = req.user;
  const user = await User.findOne({ email });

  const allowUpdates = [
    ticket.author.id === req.user.email,
    user.permissions.includes("manage"),
    user.permissions.includes("super-admin"),
  ];

  if (!allowUpdates.some(p => !!p))
    return res.status(403).json({
      message: "Access denied"
    });

  for (const key in updates) {
    ticket[key] = updates[key];
  }

  await ticket.save();
  return res.status(200).json(ticket);
});

ticketRouter.get("/my", async (req, res) => {
  if (!req.user) return res.status(401).json({
    message: "Authentication required"
  });

  const tickets = await Ticket.find({ "author.id": req.user.email });

  return res.status(200).json(tickets);
});

export default ticketRouter;

