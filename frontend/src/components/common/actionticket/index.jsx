import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Binoculars } from "lucide-react";

import "./style.css";

export function ModTicket({
  ticketId,
  title,
  author,
  anonymous,
  actions,
}) {
  const { orgId } = useParams();
  
  const watchTicket = useCallback(() => {
    window.open(`/${orgId}/${ticketId}`, '_blank');
  }, [orgId, ticketId]);

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

        {actions.map(({ icon, text, onClick }) => {
          const Icon = icon;
          return (<button
              className="mod-ticket-action"
              onClick={onClick}
              key={text}
            >
              <Icon className="mod-ticket-action-icon" />

              <span className="mod-ticket-action-text">
                {text}
              </span>
            </button>
          );
        })}
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

