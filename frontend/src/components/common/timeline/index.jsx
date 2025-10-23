import "./style.css";

export function Timeline({ events }) {
  const filteredEvents = events.filter(event => [
      "raised",
      "acknowledged",
      "progressing",
      "stale",
      "resolved",
      "skipped",
      "redacted",
  ].includes(event.label.toLowerCase()));

  return (<>
    <div className="timeline">
      {filteredEvents.map(event => (
        <div className="timeline-event" key={event.timestamp}>
          <span className="timeline-timestamp">
            {new Date(event.timestamp).toLocaleString()}
          </span>
          
          <span className="timeline-label">
            {event.label}
          </span>
        </div>
      ))}

      {filteredEvents.length === 0 && (
        <div className="timeline-no-events">
          No timeline events available
        </div>
      )}
    </div>
  </>);
}

