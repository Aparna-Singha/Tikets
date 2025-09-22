import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { VoteCounter } from "@components/votecounter";

import "./style.css";

export function TicketCard({
  id,
  title,
  voteCount,
  tags = [],
  status = "Unseen",
  author = "Anonymous",
  discussionCount = 0,
}) {
  const navigate = useNavigate();
  const { orgId } = useParams();

  const openTicket = useCallback(() => {
    navigate(`/${orgId}/${id}`);
  }, [navigate, orgId, id]);

  return (<>
    <div className="ticket-container" onClick={openTicket}>
      <div className="ticket-header">
        <VoteCounter voteCount={voteCount} />

        <div className="ticket-id">
          #{id}
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
          Raised by {author}
        </span>

        <span className="ticket-discussions">
          {discussionCount} Discussions
        </span>
      </div>
    </div>
  </>);
}

