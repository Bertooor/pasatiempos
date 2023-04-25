import Ganador from "./Componentes/Ganador";
import Juego from "./Componentes/Juego";
import Turno from "./Componentes/Turno";

function App() {
  return (
    <main>
      <h1>Conecta 4</h1>
      <button>Empezar de nuevo</button>

      <Juego />

      <Turno />

      <Ganador />
    </main>
  );
}

export default App;
