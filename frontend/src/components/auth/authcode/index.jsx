import { LoaderCircle } from "lucide-react";

import "./style.css";

export function AuthCode({ code }) {
  return (<>
    <div className="auth-code">
      {
        code.length
          ? code.length && code.map((digit, index) => <div
              key={`${index}-${digit}`}
              className="auth-code-digit"
            >{digit}</div>)
          : <LoaderCircle className="auth-code-loader" />
      }
    </div>
  </>);
}

