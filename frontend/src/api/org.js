import { callApi } from "@api/base";

export async function getOrgTickets(orgId, ticketType) {
  const endpoints = {
    mine: [`/tickets/my`],
    open: [`/tickets/${orgId}/all`],
    mod: [`/tickets/${orgId}/moderation`],
    closed: [
      `/tickets/${orgId}/status/resolved`,
      `/tickets/${orgId}/status/skipped`,
    ],
  };

  const results = [];
  const usedIds = {};

  const pushResults = async (endpoint) => {
    const response = await callApi(endpoint, 'GET');
    if (!response) return;

    for (const ticket of response)
      if (!usedIds[ticket.ticketId]) {
        usedIds[ticket.ticketId] = true;
        results.push(ticket);
      }
  };

  for (const endpoint of endpoints[ticketType] || [])
    await pushResults(endpoint);

  return results.map(ticket => ({
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    tags: ticket.tags,
    status: ticket.status,
    discussionCount: "No",
    timeline: ticket.timeline,
    anonymous: ticket.anonymous,
    author: ticket.anonymous
      ? "Anonymous"
      : ticket.author?.name || "Anonymous",
  })) || [];
}

