import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Ghost, Shredder, Signature } from "lucide-react";

import { updateTicket } from "@api/ticket";

import { usePriviledgedDataContext } from "@contexts/priviledgedData";

import { ModTicket } from "@components/common/actionticket";
import { DeskHero } from "@components/common/deskhero";

import "./style.css";

export function ModPage() {
  const { orgId } = useParams();
  const {
    modTickets,
    loadModTickets,
  } = usePriviledgedDataContext();

  const moderateTicket = useCallback(async (ticket, status, label) => {
    const updates = {
      status,
      timeline: [
        ...(ticket.timeline || []),
        {
          label: label,
          timestamp: Date.now(),
        }
      ],
    };
    
    await updateTicket(orgId, ticket.ticketId, updates);
    loadModTickets(orgId);
  }, [orgId, loadModTickets]);

  const generateActions = useCallback(ticket => [
    {
      icon: Shredder,
      text: 'Reject',
      onClick: () => moderateTicket(ticket, 'redacted', 'Redacted')
    },
    {
      icon: Signature,
      text: 'Approve',
      onClick: () => moderateTicket(ticket, 'raised', 'Raised')
    }
  ], [moderateTicket]);

  useEffect(() => {
    loadModTickets(orgId);
  }, [loadModTickets, orgId]);

  return (<>
    <div className="mod-page">
      <DeskHero deskName={"Moderation"} />

      {modTickets && modTickets.length === 0 && (<div
        className="mod-page-empty"
      >
        <Ghost className="mod-page-empty-icon" />

        <span className="mod-page-empty-text">
          Nothing to see here!
        </span>
      </div>)}

      <div className="mod-page-list">
        {modTickets.map(ticket => <ModTicket
          key={ticket.ticketId}
          actions={generateActions(ticket)}
          {...ticket}
        />)}
      </div>
    </div>
  </>);
}

