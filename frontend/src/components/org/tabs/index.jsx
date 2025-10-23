import { useCallback } from "react";
import { Briefcase, Package, PackageOpen } from "lucide-react";

import { useOrgDataContext } from "@contexts/orgData";

import "./style.css";

export function Tabs() {
  const {
    ticketType,
    setTicketType,
  } = useOrgDataContext();

  const updateTab = useCallback(async (newType) => {
    setTicketType(newType);
  }, [setTicketType]);

  return (<>
    <div className="tabs">
      <button
        onClick={() => updateTab("open")}
        className={`tab ${ticketType === "open" ? "active" : ""}`}
      >
        <PackageOpen className="tab-icon" />

        <span>
          Open
        </span>
      </button>

      <button
        onClick={() => updateTab("closed")}
        className={`tab ${ticketType === "closed" ? "active" : ""}`}
      >
        <Package className="tab-icon" />
        
        <span>
          Closed
        </span>
      </button>

      <button
        onClick={() => updateTab("mine")}
        className={`tab ${ticketType === "mine" ? "active" : ""}`}
      >
        <Briefcase className="tab-icon" />
        
        <span>
          Mine
        </span>
      </button>
    </div>
  </>);
}

