import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TentTree } from "lucide-react";

import { getUserPermissions } from "@api/auth";

import "./style.css";

export function OrgHero() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    async function fetchPermissions() {
      const permsList = await getUserPermissions();
      const perms = {
        "moderate": permsList.includes("super-admin"),
        "manage": permsList.includes("super-admin"),
      };
      
      permsList.forEach(p => perms[p] = true);
      setPermissions(perms);
    }

    fetchPermissions();
  }, []);
  
  return (<>
    <div className="org-hero">
      <div className="org-hero-top">
        <TentTree className="org-hero-icon" />

        <div className="org-hero-content">
          <h1 className="org-hero-title">
            {orgId}
          </h1>

          <div className="org-hero-subtitle">
            Issue Camp
          </div>
        </div>
      </div>

      <div className="org-hero-actions">
        <button
          className="org-hero-action"
          onClick={() => navigate(`/auth`)}
        >
          Authorization Page
        </button>

        <button
          className="org-hero-action"
          disabled={!permissions.moderate}
          onClick={() => navigate(`/${orgId}/mod-desk`)}
        >
          Moderation Desk
        </button>

        <button
          className="org-hero-action"
          disabled={!permissions.manage}
          onClick={() => navigate(`/${orgId}/staff-desk`)}
        >
          Management Desk
        </button>
      </div>
    </div>
  </>);
}

