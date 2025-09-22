import { HashRouter, Route, Routes } from "react-router-dom";

import { HalfWave } from "@components/halfwave";
import { End } from "@components/end";
import { OrgLanding } from "@components/orglanding";
import { TicketPage } from "@components/ticketpage";

export function App() {
  return (<>
    <HashRouter>
      <HalfWave name="app-top" direction="down" />

      <Routes>
        <Route path=":orgId">
          <Route index element={<OrgLanding />} />
          <Route path=":ticketId" element={<TicketPage />} />
        </Route>
      </Routes>

      <End />
    </HashRouter>
  </>);
}

