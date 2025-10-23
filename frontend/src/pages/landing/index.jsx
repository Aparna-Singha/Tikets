import { PencilRuler } from "lucide-react";

export function Landing() {
  return (<>
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      fontWeight: "bold",
      padding: 20,
      textAlign: "center"
    }}>
      <PencilRuler size={128} />
      <p>
        <h1 style={{ fontSize: 64 }}>
          Stay tuned!
        </h1>
        <span>
          We're currently building the landing page.
        </span>
      </p>
    </div>
  </>);
}

