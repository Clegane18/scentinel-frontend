import { createContext, useContext, useState } from "react";

const PerfumeContext = createContext();

export const usePerfumeContext = () => useContext(PerfumeContext);

export const PerfumeProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag((prev) => !prev);

  return (
    <PerfumeContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </PerfumeContext.Provider>
  );
};
