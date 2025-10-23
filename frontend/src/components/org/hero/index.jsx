import { Tiket } from "@components/common/tiket";

import "./style.css";

export function Hero() {
  return (<>
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-slogan">
          <span>
            Raise Openly,
          </span>
          <span>
            Resolve Clearly
          </span>
        </h1>

        <p className="hero-description">
          Create, Explore, and Track issues,
          complaints, and
          <br />
          suggestions
          with transparency and effieciency.
        </p>
      </div>

      <div className="hero-banner">
        <Tiket />
      </div>
    </div>
  </>);
}

