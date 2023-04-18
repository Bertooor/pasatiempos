export const Casilla = ({
  children,
  recargaTablero,
  index,
  estaSeleccionada,
}) => {
  const casillaYTurno = `casilla ${estaSeleccionada ? "fondoTurno" : ""}`;

  const handleClick = () => {
    recargaTablero(index);
  };

  return (
    <div onClick={handleClick} className={casillaYTurno}>
      {children}
    </div>
  );
};
