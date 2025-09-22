import { TicketCard } from "@components/ticketcard";

import "./style.css";

export function Tickets() {
  const createDummyTicket = index => ({
    id: index,
    title: `Placeholder Ticket ${index}`,
    description: `This is a placeholder description for ticket ${index}.`,
    tags: [...Array(Math.floor(
      Math.floor(Math.random() * 8) + 1
    ))].map((_, i) => `tag${i + 1}`),
    voteCount: {
      plus: Math.floor(Math.random() * 100),
      minus: Math.floor(Math.random() * 100),
    },
    status: [
      "Unseen",
      "Seen",
      "Working",
      "Resolved",
    ][Math.floor(Math.random() * 4)],
    discussionCount: Math.floor(Math.random() * 20),
  });

  const tickets = [...Array(12)].map((_, i) => createDummyTicket(i + 1));

  return (<>
    <div className="tickets">
      {tickets.map((ticket) => <TicketCard
        {...ticket}
        key={ticket.title}
      />)}
    </div>
  </>);
}

