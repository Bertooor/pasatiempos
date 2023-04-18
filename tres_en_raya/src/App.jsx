import { useState } from "react";
import "./App.css";
import { Casilla } from "./Componentes/Casilla";

const TURNOS = {
  x: "x",
  o: "o",
};

const COMBINACIONES_GANADORAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  // Estado con todas las casillas del tablero a null
  const [tablero, setTablero] = useState(Array(9).fill(null));

  const [turno, setTurno] = useState(TURNOS.x);

  const [ganador, setGanador] = useState(null);

  const compruebaGanador = (compruebaTablero) => {
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

  const reiniciaJuego = () => {
    setTablero(Array(9).fill(null));
    setTurno(TURNOS.x);
    setGanador(null);
  };

  const compruebaFinalJuego = (nuevoTablero) => {
    return nuevoTablero.every((tablero) => tablero !== null);
  };

  const recargaTablero = (index) => {
    // Para no sobreescribir ninguna acción
    if (tablero[index] || ganador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);

    const nuevoTurno = turno === TURNOS.x ? TURNOS.o : TURNOS.x;
    setTurno(nuevoTurno);

    const nuevoGanador = compruebaGanador(nuevoTablero);

    if (nuevoGanador) {
      setGanador(nuevoGanador);
    } else if (compruebaFinalJuego(nuevoTablero)) {
      setGanador(false);
    }
  };
  return (
    <main className="tablero">
      <h1>Tres en raya</h1>
      <button onClick={reiniciaJuego}>Empezar de nuevo</button>

      <section className="juego">
        {tablero.map((_, index) => {
          return (
            <Casilla key={index} index={index} recargaTablero={recargaTablero}>
              {tablero[index]}
            </Casilla>
          );
        })}
      </section>

      <section className="turno">
        <Casilla estaSeleccionada={turno === TURNOS.x}>{TURNOS.x}</Casilla>
        <Casilla estaSeleccionada={turno === TURNOS.o}>{TURNOS.o}</Casilla>
      </section>

      {ganador !== null && (
        <section className="ganador">
          <h2>{ganador === false ? "Empate" : `Ganó: ${ganador}`}</h2>
          <footer>
            <button onClick={reiniciaJuego}>Empezar de nuevo</button>
          </footer>
        </section>
      )}
    </main>
  );
}

export default App;
