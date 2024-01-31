import { createContext, useState } from "react";

export const PortalContext = createContext();

function PortalContextProvider({ children }) {
  const [portal, setPortal] = useState(false);
  return (
    <PortalContext.Provider value={{ portal,setPortal }}>
      {children}
    </PortalContext.Provider>
  );
}

export default PortalContextProvider;
