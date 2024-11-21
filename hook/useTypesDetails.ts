import { useState, useEffect } from "react";

const useTypeDetails = (id: string | number) => {
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeDetails = async () => {
      try {
        const response = await fetch(
          `https://pokebuildapi.fr/api/v1/types/${id}`
        );
        const data = await response.json();
        setType(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du type :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTypeDetails();
  }, [id]);

  return { type, loading };
};

export default useTypeDetails;
