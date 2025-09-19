import { TicketMinus, TicketPlus } from "lucide-react";

import "./style.css";

export function Ticket({
  title,
  voteCount,
  tags = [],
  status = "Unseen",
  author = "Anonymous",
  discussionCount = 0,
}) {
  return (<>
    <div className="ticket-container">
      <div className="ticket-header">
        <div className="ticket-actions">
          <button className="ticket-vote">
            <TicketPlus className="ticket-vote-content" />
          </button>
          
          <button className="ticket-vote" disabled>
            <span className="ticket-vote-content">
              {voteCount.plus}
            </span>
          </button>

          <button className="ticket-vote">
            <TicketMinus className="ticket-vote-content" />
          </button>
        </div>

        <div className="ticket-status">
          {status}
        </div>
      </div>
      
      <div className="ticket-body">
        <h3 className="ticket-title">
          {title}
        </h3>

        <div className="ticket-tags">
          {tags.map(tag => <span
            className="ticket-tag"
            key={`ticket-${title}-${tag}`}
          >
            {tag}
          </span>)}
        </div>
      </div>

      <div className="ticket-footer">
        <span className="ticket-author">
          Submitted by {author}
        </span>

        <span className="ticket-discussions">
          {discussionCount} Discussions
        </span>
      </div>
    </div>
  </>);
}

