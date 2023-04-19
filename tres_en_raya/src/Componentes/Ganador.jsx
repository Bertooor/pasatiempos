function Ganador({ ganador, reiniciaJuego }) {
  if (ganador === null) {
    return null;
  } else {
    return (
      <section className="ganador">
        <h2>{ganador === false ? "Empate" : `Ganó: ${ganador}`}</h2>
        <footer>
          <button onClick={reiniciaJuego}>Empezar de nuevo</button>
        </footer>
      </section>
    );
  }
}

export default Ganador;
