import { useCallback, useEffect, useState } from "react";
import { Fingerprint, Lightbulb, Pen } from "lucide-react";

import { cancelAuth, getAuthCode } from "@api/auth";

import { AuthCode } from "@components/auth/authcode";
import { AuthEmail } from "@components/auth/authemail";
import { AuthButton } from "@components/auth/authbutton";

import "./style.css";

export function AuthForm() {
  const [authPhase, setAuthPhase] = useState("email");
  const [authCode, setAuthCode] = useState([]);
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const backToEmail = useCallback(() => {
    setAuthPhase("email");
  }, [setAuthPhase]);

  const getCode = useCallback(async () => {
    setAuthPhase("code");
    setConfirmedEmail(email);
  }, [setAuthPhase, email]);
  
  useEffect(() => {
    if (!confirmedEmail) return;
    setAuthCode([]);

    async function fetchCode() {
      const previousEmail = localStorage.getItem("eals_previous_email");
      if (confirmedEmail !== previousEmail) await cancelAuth();
      
      const code = await getAuthCode(confirmedEmail);
      setAuthCode(code.toString().split(""));
      localStorage.setItem("eals_previous_email", confirmedEmail);
    }

    fetchCode();
  }, [confirmedEmail]);

  return (<>
    <div className="auth-box">
      <h1 className="auth-title">
        Authorize
      </h1>

      <div className="auth-details">
        {
          authPhase === "email"
            ? <AuthEmail email={email} setEmail={setEmail} />
            : <AuthCode code={authCode} />
        }
      </div>

      <div className="auth-actions">
        {authPhase === "email" && <AuthButton
          icon={Fingerprint}
          content="Continue"
          disabled={!email}
          onClick={getCode}
        />}

        {authPhase === "code" && <AuthButton
          icon={Pen}
          content="Update Email"
          onClick={backToEmail}
        />}
      </div>
    </div>
  </>);
}

