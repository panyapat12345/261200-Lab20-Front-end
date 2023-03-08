import React from "react";

export type CellProps = {
  x: number;
  y: number;
  color: string;
  paint: (x: number, y: number) => void;
};

const Cell = ({ x, y, color, paint }: CellProps) => {
  return (
    <td
      draggable="true"
      style={{
        width: "9rem",
        height: "9rem",
        cursor: "pointer",
        border: "1px solid",
        fontSize: "5rem",
      }}
      onClick={() => paint(x, y)}
      onDragEnter={() => paint(x, y)}
    >
      {color}
    </td>
  );
};

export default React.memo(Cell);
