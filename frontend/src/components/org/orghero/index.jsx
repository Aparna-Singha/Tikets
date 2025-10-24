import { useParams } from "react-router-dom";
import { TentTree } from "lucide-react";

import "./style.css";

export function OrgHero() {
  const { orgId } = useParams();
  
  return (<>
    <div className="org-hero">
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
  </>);
}

