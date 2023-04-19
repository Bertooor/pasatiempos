import { Casilla } from "./Casilla";

function Juego({ tablero, recargaTablero }) {
  return (
    <section className="juego">
      {tablero.map((casilla, index) => {
        return (
          <Casilla key={index} index={index} recargaTablero={recargaTablero}>
            {casilla}
          </Casilla>
        );
      })}
    </section>
  );
}

export default Juego;
