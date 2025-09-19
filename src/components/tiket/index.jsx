import { CircleAlert } from "lucide-react";

import "./style.css";

export function Tiket() {
  return (<>
    <div className="tiket-container">
      <div className="tiket">
        <CircleAlert className="tiket-icon" />

        <span className="tiket-text">
          Tikets
        </span>
      </div>
    </div>
  </>);
}

