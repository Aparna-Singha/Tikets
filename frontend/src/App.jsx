import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import { HalfWave } from "@components/common/halfwave";
import { End } from "@components/common/end";

import { Landing } from "@pages/landing";
import { OrgLanding } from "@pages/orglanding";
import { TicketPage } from "@pages/ticketpage";
import { RaisePage } from "@pages/raisepage";
import { AuthPage } from "@pages/authpage";
import { ModPage } from "@pages/modpage";
import { StaffPage } from "@pages/staffpage";

export function App() {
  const Router = {
    Browser: BrowserRouter,
    Hash: HashRouter
  }[window.routerMode];

  return (<>
    <Router>
      <HalfWave name="app-top" direction="down" />

      <Routes>
        <Route index element={<Landing />} />
        
        <Route path=":orgId">
          <Route index element={<OrgLanding />} />
          <Route path=":ticketId" element={<TicketPage />} />
          <Route path="raise/" element={<RaisePage createNew />} />
          <Route path="raise/:ticketId" element={<RaisePage />} />
          <Route path="mod-desk" element={<ModPage />} />
          <Route path="staff-desk" element={<StaffPage />} />
        </Route>

        <Route path="auth" element={<AuthPage />} />
      </Routes>

      <End />
    </Router>
  </>);
}

