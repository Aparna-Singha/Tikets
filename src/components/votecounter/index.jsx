import { TicketMinus, TicketPlus } from "lucide-react";

import "./style.css";

export function VoteCounter({ voteCount }) {
  return (<>
    <div className="vote-counter">
      <button className="vote-button">
        <TicketPlus className="vote-button-content" />
      </button>
      
      <button className="vote-button" disabled>
        <span className="vote-button-content">
          {voteCount.plus - voteCount.minus}
        </span>
      </button>

      <button className="vote-button">
        <TicketMinus className="vote-button-content" />
      </button>
    </div>
  </>)
}

