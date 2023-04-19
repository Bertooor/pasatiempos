import { COMBINACIONES_GANADORAS } from "./constantes";

export const compruebaGanador = (compruebaTablero) => {
  for (const combinacion of COMBINACIONES_GANADORAS) {
    const [a, b, c] = combinacion;

    if (
      compruebaTablero[a] &&
      compruebaTablero[a] === compruebaTablero[b] &&
      compruebaTablero[a] === compruebaTablero[c]
    )
      // Devuelve el ganador si lo hay
      return compruebaTablero[a];
  }
  // Si no hay ganador
  return null;
};

export const compruebaFinalJuego = (nuevoTablero) => {
  return nuevoTablero.every((tablero) => tablero !== null);
};
