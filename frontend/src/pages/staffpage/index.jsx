import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BadgeCheck,
  BookCheck,
  Ghost,
  Hammer,
  SkipForward,
} from "lucide-react";

import { updateTicket } from "@api/ticket";

import { usePriviledgedDataContext } from "@contexts/priviledgedData";

import { ModTicket } from "@components/common/actionticket";
import { DeskHero } from "@components/common/deskhero";

import "./style.css";

export function StaffPage() {
  const { orgId } = useParams();
  const {
    raisedTickets,
    loadRaisedTickets,
  } = usePriviledgedDataContext();

  const manageTicket = useCallback(async (ticket, status, label) => {
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
    loadRaisedTickets(orgId);
  }, [orgId, loadRaisedTickets]);

  const generateActions = useCallback(ticket => ({
    "raised": [
      {
        icon: BookCheck,
        text: 'Acknowledge',
        onClick: () => manageTicket(ticket, 'acknowledged', 'Acknowledged')
      },
    ],
    "acknowledged": [
      {
        icon: SkipForward,
        text: 'Skip',
        onClick: () => manageTicket(ticket, 'skipped', 'Skipped')
      },
      {
        icon: Hammer,
        text: 'Progress',
        onClick: () => manageTicket(ticket, 'progressing', 'Progressing')
      },
    ],
    "progressing": [
      {
        icon: Hammer,
        text: 'Progress',
        onClick: () => manageTicket(ticket, 'progressing', 'Progressing')
      },
      {
        icon: BadgeCheck,
        text: 'Resolve',
        onClick: () => manageTicket(ticket, 'resolved', 'Resolved')
      },
    ],
    "stale": [
      {
        icon: SkipForward,
        text: 'Skip',
        onClick: () => manageTicket(ticket, 'skipped', 'Skipped')
      },
      {
        icon: Hammer,
        text: 'Progress',
        onClick: () => manageTicket(ticket, 'progressing', 'Progressing')
      },
    ]
  }[ticket.status]), [manageTicket]);

  useEffect(() => {
    loadRaisedTickets(orgId);
  }, [loadRaisedTickets, orgId]);

  return (<>
    <div className="staff-page">
      <DeskHero deskName={"Management"} />

      {raisedTickets && raisedTickets.length === 0 && (<div
        className="staff-page-empty"
      >
        <Ghost className="staff-page-empty-icon" />

        <span className="staff-page-empty-text">
          Nothing to see here!
        </span>
      </div>)}

      <div className="staff-page-list">
        {raisedTickets.map(ticket => <ModTicket
          key={ticket.ticketId}
          actions={generateActions(ticket)}
          {...ticket}
        />)}
      </div>
    </div>
  </>);
}

