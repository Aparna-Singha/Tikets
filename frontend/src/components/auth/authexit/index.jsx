import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, TentTree, Unplug } from "lucide-react";

import { cancelAuth, checkAuthStatus, getUserData } from "@api/auth";

import { AuthButton } from "@components/auth/authbutton";

import "./style.css";

export function AuthExit({ setSignedIn }) {
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");

  const logout = useCallback(async () => {
    await cancelAuth();
    localStorage.clear();
    window.location.reload();
  }, []);

  useEffect(() => {
    if (ready) return;
    
    async function checkAuth() {
      setSignedIn(await checkAuthStatus());
      const { email } = await getUserData();
      
      setEmail(email);
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
            You are logged in
            <br />
            {!!email.length && `(${email})`}
          </div>

          <div className="auth-exit-actions">
            <AuthButton
              icon={TentTree}
              content="Your Issue Camp"
              disabled={false}
              onClick={() => navigate("/")}
            />

            <AuthButton
              icon={Unplug}
              content="Logout"
              disabled={false}
              onClick={logout}
            />
          </div>
        </>
      }
    </div>
  </>);
}

