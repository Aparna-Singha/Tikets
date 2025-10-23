import { useState } from "react";

import { AuthExit } from "@components/auth/authexit";
import { AuthForm } from "@components/auth/authform";
import { AuthHelp } from "@components/auth/authhelp";

import "./style.css";

export function AuthPage() {
  const [signedIn, setSignedIn] = useState(true);

  return (<>
    <div className="auth-container">
      {signedIn && <AuthExit setSignedIn={setSignedIn} />}
      {!signedIn && <AuthForm />}
      {!signedIn && <AuthHelp />}
    </div>
  </>);
}

