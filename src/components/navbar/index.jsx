import { BadgePlus } from "lucide-react";

import { Search } from "@components/search";

import "./style.css";

export function Navbar() {
  return (<>
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-top">
          <h2 className="navbar-count">
            12 Open Tickets
          </h2>

          <div className="actions">
            <button className="actions-button">
              <BadgePlus />
              <span>
                Raise New Ticket
              </span>
            </button>
          </div>
        </div>

        <div className="navbar-bottom">
          <Search />
        </div>
      </div>
    </nav>
  </>);
}

