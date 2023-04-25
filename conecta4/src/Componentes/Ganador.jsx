function Ganador({ ganador }) {
  if (ganador === null) {
    return null;
  } else {
    return (
      <section>
        <h2>Ganador</h2>
        <footer>
          <button>Empezar de nuevo</button>
        </footer>
      </section>
    );
  }
}

export default Ganador;
