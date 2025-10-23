import "./style.css";

export function AuthButton({
  icon,
  content,
  disabled,
  onClick,
}) {
  const Icon = icon;

  return (<>
    <button
      className="auth-button"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="auth-button-icon" />
      <span className="auth-button-text">
        {content}
      </span>
    </button>
  </>);
}

