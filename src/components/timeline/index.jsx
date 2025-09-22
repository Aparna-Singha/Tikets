import "./style.css";

export function Timeline({ events }) {
  return (<>
    <div className="timeline">
      {events.map(event => (
        <div className="timeline-event" key={event.timestamp}>
          <span className="timeline-timestamp">
            {event.timestamp}
          </span>
          
          <span className="timeline-label">
            {event.label}
          </span>
        </div>
      ))}
    </div>
  </>);
}

