import "./style.css";

export function HalfWave({
  name,
  direction="up",
}) {
  return (<>
    <div className="half-wave-container">
      <div className={`half-wave half-wave-${name} half-wave-${direction}`}>
        {[...Array(55)].map((_, idx) => <span key={idx} />)}
      </div>
    </div>
  </>);
}

