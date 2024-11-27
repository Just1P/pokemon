export const typeColors: { [key: string]: string } = {
  Plante: "#78C850",
  Feu: "#F08030",
  Eau: "#6890F0",
  Insecte: "#A8B820",
  Normal: "#A8A878",
  Poison: "#A040A0",
  Électrik: "#F8D030",
  Sol: "#E0C068",
  Fée: "#EE99AC",
  Combat: "#C03028",
  Psy: "#F85888",
  Roche: "#B8A038",
  Spectre: "#705898",
  Glace: "#98D8D8",
  Dragon: "#7038F8",
  Ténèbres: "#705848",
  Acier: "#B8B8D0",
  Vol: "#A890F0",
};

export const getTypeColor = (types: any[]): string => {
  if (types.length > 1) {
    return typeColors[types[1]?.name] || "#ccc";
  }
  return typeColors[types[0]?.name] || "#ccc";
};
