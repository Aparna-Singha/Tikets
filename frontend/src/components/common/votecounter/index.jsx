import { useCallback, useEffect, useState } from "react";
import { TicketMinus, TicketPlus } from "lucide-react";

import "./style.css";

export function VoteCounter() {
  const [votedType, setVotedType] = useState(null);
  const [voteCount, setVoteCount] = useState({ plus: 0, minus: 0 });

  const refreshVoteCount = useCallback(() => {
    setVoteCount({ plus: 0, minus: 0 });
  }, []);

  const updateVoteCount = useCallback((event, type) => {
    event.stopPropagation();
    setVotedType(prev => {
      if (prev === type) return null;
      return type;
    });
  }, []);

  useEffect(() => {
    refreshVoteCount();
  }, [refreshVoteCount]);

  return (<>
    <div className="vote-counter">
      <button
        className={[
          "vote-button",
          votedType === "plus" ? "active" : ""
        ].join(' ')}
        onClick={(event) => updateVoteCount(event, "plus")}
      >
        <TicketPlus className="vote-button-content" />
      </button>
      
      <button className="vote-button" disabled>
        <span className="vote-button-content">
          {voteCount.plus - voteCount.minus}
        </span>
      </button>

      <button
        className={[
          "vote-button",
          votedType === "minus" ? "active" : ""
        ].join(' ')}
        onClick={(event) => updateVoteCount(event, "minus")}
      >
        <TicketMinus className="vote-button-content" />
      </button>
    </div>
  </>)
}

