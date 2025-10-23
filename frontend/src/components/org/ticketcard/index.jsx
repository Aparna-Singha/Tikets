import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { VoteCounter } from "@components/common/votecounter";

import "./style.css";

export function TicketCard({
  ticketId,
  title,
  tags = [],
  status = "Unseen",
  author = "Anonymous",
  anonymous = true,
  timeline = [],
}) {
  const navigate = useNavigate();
  const { orgId } = useParams();

  const openTicket = useCallback(() => {
    navigate(`/${orgId}/${ticketId}`);
  }, [navigate, orgId, ticketId]);

  return (<>
    <div className="ticket-container" onClick={openTicket}>
      <div className="ticket-header">
        <VoteCounter orgId={orgId} ticketId={ticketId} />

        <div className="ticket-id">
          #{ticketId}
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
          Raised by {anonymous ? "Anonymous" : author}
        </span>

        <span className="ticket-discussions">
          {timeline.length} Updates
        </span>
      </div>
    </div>
  </>);
}

