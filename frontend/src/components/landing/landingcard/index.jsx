import "./style.css";

export function LandingCard({
  icon,
  title,
  description,
}) {
  const Icon = icon;
  return (<>
    <div className="landing-card">
      <div className="landing-card-top">
        <Icon className="landing-card-icon" />

        <h3 className="landing-card-title">
          {title}
        </h3>
      </div>

      <div className="landing-card-content">
        <p className="landing-card-description">
          {description}
        </p>
      </div>
    </div>
  </>);
}

