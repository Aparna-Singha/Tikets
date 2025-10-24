import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shell, TentTree } from "lucide-react";

import { getUserData } from "@api/auth";

import { Tiket } from "@components/common/tiket";

import "./style.css";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    if (loaded) navigate("/auth");
  }, [navigate, loaded]);

  useEffect(() => {
    async function checkRedirect() {
      const user = await getUserData();
      setLoaded(true);
      
      if (!user) return;
      navigate(`/${user.org}`);
    }

    checkRedirect();
  }, [navigate]);

  return (<>
    <div className="hero">
      <div className="hero-action">
        <button className="hero-action-button" onClick={goToLogin}>
          {
            loaded
            ? <TentTree className="hero-action-button-icon" />
            : <Shell className="hero-action-button-icon spin" />
          }

          <span className="hero-action-button-text">
            {
              loaded
                ? "See your Issue Camp"
                : "Finding your Issue Camp..."
            }
          </span>
        </button>
      </div>

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

