import { useEffect, useState } from "react";
import { LoaderCircle, Unplug } from "lucide-react";

import { cancelAuth, checkAuthStatus } from "@api/auth";

import { AuthButton } from "@components/auth/authbutton";

import "./style.css";

export function AuthExit({ setSignedIn }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    
    async function checkAuth() {
      setSignedIn(await checkAuthStatus());
      setReady(true);
    }

    checkAuth();
  }, [ready, setSignedIn]);

  return (<>
    <div className="auth-exit-box">
      {!ready
        ? <LoaderCircle className="auth-exit-loader" />
        : <>
          <h1 className="auth-title">
            Authorized
          </h1>

          <div className="auth-exit-details">
            You are logged in.
          </div>

          <div className="auth-exit-actions">
            <AuthButton
              icon={Unplug}
              content="Logout"
              disabled={false}
              onClick={() => cancelAuth()}
            />
          </div>
        </>
      }
    </div>
  </>);
}

