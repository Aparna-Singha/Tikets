import { HalfWave } from "@components/common/halfwave";

import "./style.css";

export function End() {
  return (<>
    <div className="footer-margin" />
    <footer className="end">
      <HalfWave name="end" direction="up" />
      
      <div className="footer-content">
        Welcome to the end of the page!
      </div>
    </footer>
  </>);
}

