import { useState, useEffect } from "react";

const usePokemonTabs = () => {
  const [activeTab, setActiveTab] = useState("resistances");
  const [typeImages, setTypeImages] = useState({});

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/types");
        const types = await response.json();
        const typeMap = types.reduce((acc, type) => {
          acc[type.name] = type.image;
          return acc;
        }, {});
        setTypeImages(typeMap);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  return { activeTab, setActiveTab, typeImages };
};

export default usePokemonTabs;
