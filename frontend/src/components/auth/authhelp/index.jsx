import "./style.css";

export function AuthHelp() {
  return (<>
    <div className="auth-help-box">
      <h1 className="auth-help-title">
        EchoAuth Login System
      </h1>

      <div className="auth-help-steps">
        <div className="auth-help-step">
          <span>
            Enter email to get a code
          </span>
        </div>

        <div className="auth-help-step">
          <span>
            Email this code to {' '}
            <a href="mailto:tikets.login@gmail.com">
              tikets.login@gmail.com
            </a>
          </span>
        </div>

        <div className="auth-help-step">
          <span>
            You will be logged in within 5-10 minutes
          </span>
        </div>
      </div>
    </div>
  </>);
}

