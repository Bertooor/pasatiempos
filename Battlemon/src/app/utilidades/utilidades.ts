export const extraeIdPokemon = (url: string): string => {
  let id: string = url.slice(34, -1);
  return id;
};

export const idRandom = (): string => {
  return Math.floor(Math.random() * 1010 + 1).toString();
};

export const desordenaArray = (arr: any) => {
  return arr.sort(() => Math.random() - 0.5);
};
