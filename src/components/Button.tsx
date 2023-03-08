import React, { useState } from "react";

export default function Button(props: any) {
  const [XState, setXState] = useState(false);
  const [OState, setOState] = useState(false);
  const [ViewState, setViewState] = useState(true);

  const selMode = (selMode: string) => {
    props.setColor(selMode);

    setXState(false);
    setOState(false);
    setViewState(false);
    if (selMode === "X") {
      setXState(true);
    } else if (selMode === "O") {
      setOState(true);
    } else {
      setViewState(true);
    }
  };

  return (
    <div>
      <button
        key={"X"}
        style={{
          margin: "1.5rem",
          width: "6rem",
          height: "3rem",
          fontSize: "1.5rem",
        }}
        disabled={XState}
        onClick={() => selMode("X")}
      >
        X
      </button>
      <button
        key={"O"}
        style={{
          margin: "1.5rem",
          width: "6rem",
          height: "3rem",
          fontSize: "1.5rem",
        }}
        disabled={OState}
        onClick={() => selMode("O")}
      >
        O
      </button>
      <button
        key={"View"}
        style={{
          margin: "1.5rem",
          width: "6rem",
          height: "3rem",
          fontSize: "1.5rem",
        }}
        disabled={ViewState}
        onClick={() => selMode("")}
      >
        View
      </button>
    </div>
  );
}
