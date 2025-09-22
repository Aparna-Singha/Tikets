import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Home } from "lucide-react";

import { VoteCounter } from "@components/votecounter";
import { Timeline } from "@components/timeline";

import "./style.css";

export function TicketPage() {
  const { orgId, ticketId } = useParams();
  const navigate = useNavigate();

  const title = "Sample Ticket Title";
  const description = [
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in",
    "aliquid officia cum cumque eaque earum quod, cupiditate ad omnis quae",
    "quos iure atque totam dolor ab sit dolorum ullam!",
  ].join(" ");

  const author = "john_doe";
  const status = "Resolved";
  const tags = ["bug", "frontend", "high priority"];
  const timeline = [
    {
      timestamp: "2023-10-01 10:00",
      label: "Raised",
    },
    {
      timestamp: "2023-10-02 14:30",
      label: "Acknowledged",
    },
    {
      timestamp: "2023-10-03 09:15",
      label: "Progressing",
    },
    {
      timestamp: "2023-10-04 16:45",
      label: "Resolved",
    }
  ]

  const voteCount = {
    plus: 42,
    minus: 7,
  };

  const navigateHome = useCallback(() => {
    navigate(`/${orgId}`);
  }, [navigate, orgId]);

  return (<>
    <div className="ticket-page">
      <div className="ticket-page-navbar">
        <button className="ticket-page-home-button" onClick={navigateHome}>
          <Home strokeWidth={2} />
        </button>

        <div className="ticket-page-header">
          <VoteCounter voteCount={voteCount} />

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
              Timeline
            </h4>

            <div className="ticket-page-meta-item-content">
              <Timeline events={timeline} />
            </div>
          </div>

          <div className="ticket-page-meta-item">
            <h4 className="ticket-page-meta-item-title">
              Raised by
            </h4>

            <div className="ticket-page-meta-item-content">
              {author}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

