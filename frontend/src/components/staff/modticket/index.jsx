import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Binoculars, Shredder, Signature } from "lucide-react";

import { updateTicket } from "@api/ticket";

import "./style.css";

export function ModTicket({
  ticketId,
  title,
  author,
  anonymous,
  timeline,
}) {
  const { orgId } = useParams();
  
  const watchTicket = useCallback(() => {
    window.open(`/${orgId}/${ticketId}`, '_blank');
  }, [orgId, ticketId]);

  const moderateTicket = useCallback(async (status, label) => {
    const updates = {
      status,
      timeline: [
        ...(timeline || []),
        {
          label: label,
          timestamp: Date.now(),
        }
      ],
    };
    
    await updateTicket(orgId, ticketId, updates);
    window.location.reload();
  }, [timeline, orgId, ticketId]);

  return (<>
    <div className="mod-ticket">
      <div className="mod-ticket-actions">
        <button className="mod-ticket-action" onClick={watchTicket}>
          <Binoculars className="mod-ticket-action-icon" />

          <span className="mod-ticket-action-text">
            Watch
          </span>
        </button>

        <div className="mod-ticket-action-separator">
          #{ticketId}
        </div>

        <button
          className="mod-ticket-action"
          onClick={() => moderateTicket('redacted', 'Redacted')}
        >
          <Shredder className="mod-ticket-action-icon" />

          <span className="mod-ticket-action-text">
            Reject
          </span>
        </button>

        <button
          className="mod-ticket-action"
          onClick={() => moderateTicket('raised', 'Raised')}
        >
          <Signature className="mod-ticket-action-icon" />

          <span className="mod-ticket-action-text">
            Approve
          </span>
        </button>
      </div>

      <div className="mod-ticket-content">
        <div className="mod-ticket-title">
          {title}
        </div>

        <div className="mod-ticket-author">
          ~ {anonymous ? "Anonymous" : author}
        </div>
      </div>
    </div>
  </>);
}

