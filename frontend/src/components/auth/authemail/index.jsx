import "./style.css";

export function AuthEmail({
  email,
  setEmail
}) {
  return (<>
    <div className="auth-input-group">
      <input
        className="auth-input"
        id="auth-email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>
  </>);
}

