import { OrgDataProvider } from "@contexts/orgData";
import { TicketDataProvider } from "@contexts/ticketData";
import { PriviledgedDataProvider } from "@contexts/priviledgedData";

export function RootProvider({children}) {
  const mergeProviders = (...providers) => {
    const TopProvider = providers.shift();
    return (<>
      <TopProvider>
        {
          providers.length
            ? mergeProviders(...providers)
            : children
        }
      </TopProvider>
    </>);
  };

  return mergeProviders(
    OrgDataProvider,
    TicketDataProvider,
    PriviledgedDataProvider,
  );
}

