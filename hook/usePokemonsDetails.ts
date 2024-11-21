import { useState, useEffect } from "react";

const usePokemonDetails = (id: string | number) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokebuildapi.fr/api/v1/pokemon/${id}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du Pokémon :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return { pokemon, loading };
};

export default usePokemonDetails;
