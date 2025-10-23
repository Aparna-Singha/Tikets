import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Home } from "lucide-react";

import { useTicketDataContext } from "@contexts/ticketData";

import { VoteCounter } from "@components/common/votecounter";
import { Timeline } from "@components/common/timeline";

import "./style.css";

export function TicketPage() {
  const { orgId, ticketId } = useParams();
  const navigate = useNavigate();
  const {
    title,
    description,
    author,
    status,
    tags,
    timeline,
    anonymous,
    loadTicketData,
  } = useTicketDataContext();

  const navigateHome = useCallback(() => {
    navigate(`/${orgId}`);
  }, [navigate, orgId]);

  useEffect(() => {
    loadTicketData(orgId, ticketId);
  }, [loadTicketData, orgId, ticketId]);

  return (<>
    <div className="ticket-page">
      <div className="ticket-page-navbar">
        <button className="ticket-page-home-button" onClick={navigateHome}>
          <Home strokeWidth={2} />
        </button>

        <div className="ticket-page-header">
          <VoteCounter orgId={orgId} ticketId={ticketId} />

          <div className="ticket-page-id">
            {orgId}#{ticketId}
          </div>

          <div className="ticket-page-status">
            {status}
          </div>
        </div>
      </div>

      <div className="ticket-page-content">
        <div className="ticket-page-main">
          <h1 className="ticket-page-title">
            {title}
          </h1>
          <p className="ticket-page-description">
            {description}
          </p>
        </div>

        <div className="ticket-page-meta">
          <div className="ticket-page-meta-item">
            <h4 className="ticket-page-meta-item-title">
              Raised by
            </h4>

            <div className="ticket-page-meta-item-content">
              {anonymous ? "Anonymous" : author}
            </div>
          </div>
          
          <div className="ticket-page-meta-item">
            <h4 className="ticket-page-meta-item-title">
              Tagged
            </h4>

            <div className="ticket-page-meta-item-content">
              <div className="ticket-page-tags">
                {tags.map((tag) => (
                  <span key={tag} className="ticket-page-tag">
                    {tag}
                  </span>
                ))}

                {tags.length === 0 && (
                  <span className="ticket-page-no-tags">
                    Not tagged with anything
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="ticket-page-meta-item">
            <h4 className="ticket-page-meta-item-title">
              Timeline
            </h4>

            <div className="ticket-page-meta-item-content">
              <Timeline events={timeline} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

