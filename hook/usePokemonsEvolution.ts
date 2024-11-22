import { useState, useEffect } from "react";

const usePokemonEvolutions = (id) => {
  const [evolutions, setEvolutions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonEvolutions = async () => {
      try {
        const response = await fetch(
          `https://pokebuildapi.fr/api/v1/pokemon/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Vérifie si les évolutions existent et extrait les Pokedex IDs
        const evolutionIds =
          data.evolutions?.map((evolution) => ({
            name: evolution.name,
            pokedexId: evolution.pokedexId,
          })) || [];

        setEvolutions(evolutionIds);
      } catch (err) {
        console.error("Erreur lors de la récupération des évolutions :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonEvolutions();
  }, [id]);

  return { evolutions, loading, error };
};

export default usePokemonEvolutions;
