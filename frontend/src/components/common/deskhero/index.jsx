import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DoorOpen, RefreshCcw } from "lucide-react";

import "./style.css";

export function DeskHero({ deskName }) {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  const exitModDesk = useCallback(() => {
    navigate(`/${orgId}`);
  }, [navigate, orgId]);

  return (<>
    <div className="desk-hero">
      <h1 className="desk-hero-title">
        {deskName} Desk
      </h1>

      <div className="desk-hero-actions">
        <button className="desk-hero-action" onClick={refreshPage}>
          <RefreshCcw className="desk-hero-action-icon" />

          <span className="desk-hero-action-text">
            Refresh Tickets
          </span>
        </button>

        <button className="desk-hero-action" onClick={exitModDesk}>
          <DoorOpen className="desk-hero-action-icon" />

          <span className="desk-hero-action-text">
            Exit {deskName} Desk
          </span>
        </button>
      </div>
    </div>
  </>);
}

