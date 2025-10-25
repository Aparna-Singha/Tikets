import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Pen } from "lucide-react";

import { submitPassword } from "@api/auth";

import { AuthInput } from "@components/auth/authinput";
import { AuthButton } from "@components/auth/authbutton";

import "./style.css";

export function AuthForm() {
  const navigate = useNavigate();

  const [authPhase, setAuthPhase] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validating, setValidating] = useState(false);

  const backToEmail = useCallback(() => {
    setAuthPhase("email");
  }, [setAuthPhase]);

  const getCode = useCallback(async () => {
    setAuthPhase("password");
  }, [setAuthPhase]);

  const confirmedPassword = useCallback(async () => {
    setValidating(true);
    const { success } = await submitPassword(email, password);
    if (success) navigate("/");
    setValidating(false);
  }, [email, password, navigate]);

  return (<>
    <div className="auth-box">
      <h1 className="auth-title">
        Authorize
      </h1>

      <div className="auth-details">
        {authPhase === "email" && <AuthInput
          value={email}
          setValue={setEmail}
          type={"email"}
          placeholder={"Enter your email"}
        />}

        {authPhase === "password" && <AuthInput
          value={password}
          setValue={setPassword}
          type={"password"}
          placeholder={"Enter your password"}
        />}

        {authPhase === "password" && <p className="auth-info-text">
          We will create an account with this
          password if account does not already exist.
        </p>}
      </div>

      <div className="auth-actions">
        {authPhase === "email" && <AuthButton
          icon={Fingerprint}
          content="Continue"
          disabled={!email}
          onClick={getCode}
        />}

        {authPhase === "password" && <AuthButton
          icon={Fingerprint}
          content="Continue"
          loading={validating}
          disabled={!password}
          onClick={confirmedPassword}
        />}

        {authPhase !== "email" && <AuthButton
          icon={Pen}
          content="Update Email"
          onClick={backToEmail}
        />}
      </div>
    </div>
  </>);
}

