import { useRef } from "react";
import { Binoculars } from "lucide-react";

import { useOrgDataContext } from "@contexts/orgData";

import "./style.css";

export function Search() {
  const inputRef = useRef();
  const { setSearchQuery } = useOrgDataContext();
  
  return (<>
    <div className="search" onClick={() => inputRef.current?.focus()}>
      <span className="search-icon">
        <Binoculars />
      </span>

      <input
        type="text"
        placeholder="Search Titles of Open Tickets..."
        className="search-input"
        ref={inputRef}
        autoComplete="off"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </>);
}

