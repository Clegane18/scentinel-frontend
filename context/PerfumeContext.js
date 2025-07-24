import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const PerfumeContext = createContext();

export const usePerfumeContext = () => useContext(PerfumeContext);

export const PerfumeProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerfumes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/perfumes");
      setPerfumes(response.data.perfumes);
    } catch (error) {
      console.error("Failed to fetch perfumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerRefresh = () => {
    fetchPerfumes();
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  return (
    <PerfumeContext.Provider value={{ perfumes, loading, triggerRefresh }}>
      {children}
    </PerfumeContext.Provider>
  );
};
