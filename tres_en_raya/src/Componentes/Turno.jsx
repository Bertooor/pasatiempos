import { Casilla } from "./Casilla";
import { TURNOS } from "../constantes";

function Turno({ turno }) {
  return (
    <section className="turno">
      <Casilla estaSeleccionada={turno === TURNOS.x}>{TURNOS.x}</Casilla>
      <Casilla estaSeleccionada={turno === TURNOS.o}>{TURNOS.o}</Casilla>
    </section>
  );
}

export default Turno;
