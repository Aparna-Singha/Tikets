import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { getTicket } from "@api/ticket";

function context() {
  const TicketDataContext = createContext({});

  function useTicketDataContext() {
    return useContext(TicketDataContext);
  }

  function TicketDataProvider({ children }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("");
    const [tags, setTags] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [anonymous, setAnonymous] = useState(false);

    const updateTicket = useCallback(({
      title,
      description,
      author,
      status,
      tags,
      timeline,
      anonymous,
    }) => {
      setTitle(title);
      setDescription(description);
      setAuthor(author);
      setStatus(status);
      setTags(tags);
      setTimeline(timeline);
      setAnonymous(anonymous);
    }, []);

    const loadTicketData = useCallback(async (orgId, ticketId) => {
      const ticketData = await getTicket(orgId, ticketId);
      updateTicket(ticketData);
    }, [updateTicket]);

    const values = {
      loadTicketData,
      title,
      description,
      author,
      status,
      tags,
      timeline,
      anonymous,
      updateTicket,
    };

    return (<>
      <TicketDataContext.Provider value={values}>
        {children}
      </TicketDataContext.Provider>
    </>);
  }

  return {
    TicketDataProvider,
    useTicketDataContext,
  };
}

export const {
  TicketDataProvider,
  useTicketDataContext,
} = context();

