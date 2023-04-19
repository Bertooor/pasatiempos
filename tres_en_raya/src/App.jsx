import { useState } from "react";
import "./App.css";

// Librería para usar confetti
import confetti from "canvas-confetti";

import { TURNOS } from "./constantes";
import { compruebaGanador, compruebaFinalJuego } from "./utilidades";

import Ganador from "./Componentes/Ganador";
import Juego from "./Componentes/Juego";
import Turno from "./Componentes/Turno";

function App() {
  // Estado con todas las casillas del tablero a null
  const [tablero, setTablero] = useState(() => {
    const guardarPartidaEmpezada = window.localStorage.getItem("tablero");

    return guardarPartidaEmpezada
      ? JSON.parse(guardarPartidaEmpezada)
      : Array(9).fill(null);
  });

  const [turno, setTurno] = useState(TURNOS.x);

  const [ganador, setGanador] = useState(null);

  const reiniciaJuego = () => {
    setTablero(Array(9).fill(null));
    setTurno(TURNOS.x);
    setGanador(null);

    window.localStorage.removeItem("tablero");
    window.localStorage.removeItem("turno");
  };

  const recargaTablero = (index) => {
    // Para no sobreescribir ninguna acción
    if (tablero[index] || ganador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);

    const nuevoTurno = turno === TURNOS.x ? TURNOS.o : TURNOS.x;
    setTurno(nuevoTurno);

    window.localStorage.setItem("tablero", JSON.stringify(nuevoTablero));
    window.localStorage.setItem("turno", nuevoTurno);

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

      <Juego tablero={tablero} recargaTablero={recargaTablero} />

      <Turno turno={turno} />

      <Ganador ganador={ganador} reiniciaJuego={reiniciaJuego} />
    </main>
  );
}

export default App;
