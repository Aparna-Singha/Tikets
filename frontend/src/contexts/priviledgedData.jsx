import { createContext, useCallback, useContext, useState } from "react";

import { getOrgTickets } from "@api/org";

function context() {
  const PriviledgedDataContext = createContext({});

  function usePriviledgedDataContext() {
    return useContext(PriviledgedDataContext);
  }

  function PriviledgedDataProvider({ children }) {
    const [modTickets, setModTickets] = useState([]);
    const [raisedTickets, setRaisedTickets] = useState([]);

    const loadModTickets = useCallback(async (orgId) => {
      const tickets = await getOrgTickets(orgId, 'mod');
      setModTickets(tickets);
    }, [setModTickets]);

    const loadRaisedTickets = useCallback(async (orgId) => {
      const tickets = await getOrgTickets(orgId, 'open');
      setRaisedTickets(tickets);
    }, [setRaisedTickets]);

    const values = {
      modTickets,
      raisedTickets,
      loadModTickets,
      loadRaisedTickets,
    };

    return <PriviledgedDataContext.Provider value={values}>
      {children}
    </PriviledgedDataContext.Provider>
  }

  return {
    PriviledgedDataProvider,
    usePriviledgedDataContext,
  };
}

export const {
  PriviledgedDataProvider,
  usePriviledgedDataContext,
} = context();

