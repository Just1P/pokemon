import { useEffect, useState } from "react";

const useTypes = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/types");
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types :", error);
      }
    };

    fetchTypes();
  }, []);

  return types;
};

export default useTypes;
