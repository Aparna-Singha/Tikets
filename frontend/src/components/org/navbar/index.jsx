import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BadgePlus } from "lucide-react";

import { useOrgDataContext } from "@contexts/orgData";

import { Search } from "@components/org/search";
import { Tabs } from "@components/org/tabs";

import "./style.css";

export function Navbar() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    ticketsCount,
  } = useOrgDataContext();

  const raiseNewTicket = useCallback(() => {
    navigate(`/${orgId}/raise`);
  }, [navigate, orgId]);

  return (<>
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-top">
          <h2 className="navbar-count">
            {
              loading === "loading"
                ? "Finding Tickets..."
                : `Found ${ticketsCount} Ticket${
                  ticketsCount === 1
                    ? ""
                    : "s"
                }`
            }
          </h2>

          <div className="actions">
            <button className="actions-button" onClick={raiseNewTicket}>
              <BadgePlus />
              
              <span>
                Raise New Ticket
              </span>
            </button>
          </div>
        </div>

        <div className="navbar-bottom">
          <Search />
          <Tabs />
        </div>
      </div>
    </nav>
  </>);
}

