import { useEffect, useState } from "react";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
    };

    fetchPokemons();
  }, []);

  return pokemons;
};

export default usePokemons;
