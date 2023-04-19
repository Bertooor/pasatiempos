import { useState } from "react";
import "./App.css";

import { Casilla } from "./Componentes/Casilla";
import { TURNOS } from "./constantes";
import { compruebaGanador } from "./utilidades";

// Librería para usar confetti
import confetti from "canvas-confetti";

function App() {
  // Estado con todas las casillas del tablero a null
  const [tablero, setTablero] = useState(Array(9).fill(null));

  const [turno, setTurno] = useState(TURNOS.x);

  const [ganador, setGanador] = useState(null);

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
      confetti();
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
        {tablero.map((casilla, index) => {
          return (
            <Casilla key={index} index={index} recargaTablero={recargaTablero}>
              {casilla}
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
