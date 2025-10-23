import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Ghost } from "lucide-react";

import { useOrgDataContext } from "@contexts/orgData";

import { TicketCard } from "@components/org/ticketcard";

import "./style.css";

export function Tickets() {
  const { orgId } = useParams();
  const { tickets, loadOrgData } = useOrgDataContext();

  useEffect(() => {
    loadOrgData(orgId);
  }, [loadOrgData, orgId]);

  return (<>
    {!tickets || tickets.length === 0 && (<div
      className="tickets-page-empty"
    >
      <Ghost className="tickets-page-empty-icon" />

      <span className="tickets-page-empty-text">
        Nothing to see here!
      </span>
    </div>)}

    <div className="tickets">
      {tickets.map((ticket) => <TicketCard
        key={ticket.ticketId}
        {...ticket}
      />)}
    </div>
  </>);
}

