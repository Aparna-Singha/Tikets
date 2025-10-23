import { callApi } from "@api/base";

export async function getTicket(orgId, ticketId) {
  return (ticket => ({
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    tags: ticket.tags,
    status: ticket.status,
    timeline: ticket.timeline,
    discussionCount: "No",
    anonymous: ticket.anonymous,
    author: ticket.author?.name || "Anonymous",
  }))(
    await callApi(`/tickets/${orgId}/ticket/${ticketId}`, 'GET')
  ) || null;
}

export async function generateTicket(orgId) {
  return (ticket => ({
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    tags: ticket.tags,
    status: ticket.status,
    timeline: ticket.timeline,
    discussionCount: "No",
    author: !ticket.anonymous
      ? ticket.author.name
      : "Anonymous",
  }))(
    await callApi(`/tickets/${orgId}`, 'POST')
  ) || null;
}

export async function updateTicket(orgId, ticketId, data) {
  await callApi(`/tickets/${orgId}/ticket/${ticketId}`, 'PUT', {
    updates: data
  });
}

