import { useState, useEffect } from "react";

const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokebuildapi.fr/api/v1/pokemon/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des détails du Pokémon :",
          err
        );
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return { pokemon, loading, error };
};

export default usePokemonDetails;
