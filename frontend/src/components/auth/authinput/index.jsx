import "./style.css";

export function AuthInput({
  value,
  setValue,
  placeholder,
  type,
}) {
  return (<>
    <div className="auth-input-group">
      <input
        className="auth-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  </>);
}

