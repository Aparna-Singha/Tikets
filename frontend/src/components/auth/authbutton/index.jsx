import { LoaderCircle } from "lucide-react";
import "./style.css";

export function AuthButton({
  icon,
  content,
  disabled,
  onClick,
  loading = false,
}) {
  const Icon = icon;

  return (<>
    <button
      className="auth-button"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {
        loading
          ? <LoaderCircle className="auth-button-icon spin" />
          : <>
            <Icon className="auth-button-icon" />
            <span className="auth-button-text">
              {content}
            </span>
          </>
      }
    </button>
  </>);
}

