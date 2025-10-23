import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getOrgTickets } from "@api/org";

function context() {
  const OrgDataContext = createContext({});

  function useOrgDataContext() {
    return useContext(OrgDataContext);
  }

  function OrgDataProvider({ children }) {
    const [ticketType, setTicketType] = useState("open");
    const [tickets, setTickets] = useState([]);
    const [ticketsCount, setTicketsCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [loading, setLoading] = useState("loading");
    const [allTickets, setAllTickets] = useState([]);

    const loadOrgData = useCallback(async (orgId) => {
      const fetchedTickets = await getOrgTickets(orgId, ticketType);
      setAllTickets(fetchedTickets);
      setLoading("loaded");
    }, [ticketType]);

    useEffect(() => {
      const loweredQuery = searchQuery.toLowerCase();
      const loweredTitle = ticket => ticket.title.toLowerCase();
      const isMatch = ticket => loweredTitle(ticket).includes(loweredQuery);

      const filteredTickets = allTickets.filter(isMatch);

      setTickets(filteredTickets);
      setTicketsCount(filteredTickets.length);
    }, [allTickets, searchQuery]);

    const values = {
      loadOrgData,
      loading,
      tickets,
      ticketsCount,
      ticketType,
      setTicketType,
      setSearchQuery,
    };

    return <OrgDataContext.Provider value={values}>
      {children}
    </OrgDataContext.Provider>
  }

  return {
    OrgDataProvider,
    useOrgDataContext,
  };
}

export const {
  OrgDataProvider,
  useOrgDataContext
} = context();

