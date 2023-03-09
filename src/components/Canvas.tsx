import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import Cell from "./Cell";
import Button from "./Button";

let client: Client;

function Canvas() {
  const [colorGrid, setColorGrid] = useState([[]]);
  const [color, setColor] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [won, setWon] = useState("");

  useEffect(() => {
    if (!client) {
      client = new Client({
        brokerURL: "ws://localhost:8080/demo-websocket",
        onConnect: () => {
          client.subscribe("/app/canvas", (message) => {
            const body = JSON.parse(message.body);
            setColorGrid(body["colorGrid"]);
            setHasWon(body["hasWon"]);
            setWon(body["won"]);
            // console.log(body);
          });

          client.subscribe("/topic/canvas", (message) => {
            const body = JSON.parse(message.body);
            setColorGrid(body["colorGrid"]);
            setHasWon(body["hasWon"]);
            setWon(body["won"]);
            // console.log(body);
          });
        },
      });

      client.activate();
    }
  }, []);

  const paint = (x: number, y: number) => {
    /*
    console.log(
      JSON.stringify({
        color: color,
        posX: x,
        posY: y,
      })
    );
    */

    if (color === "") return;

    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/paint",
          body: JSON.stringify({
            color: color,
            posX: x,
            posY: y,
          }),
        });
      }
    }
  };

  const newGame = () => {
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/newGame",
        });
      }
    }
  };

  return (
    <div>
      <Button setColor={setColor} />
      <div style={{ marginLeft: "34rem" }}>
        <table
          style={{
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {colorGrid.map((row, j) => (
              <tr key={j}>
                {row.map((col, i) => (
                  <Cell
                    x={i}
                    y={j}
                    key={`${i}${j}`}
                    paint={paint}
                    color={colorGrid[j][i]}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasWon === true ? (
        <div>
          <p style={{ fontSize: "4rem", color: "red", margin: "1rem" }}>
            {won} won
          </p>
          <button
            key={"New Game"}
            style={{
              margin: "0rem",
              width: "10rem",
              height: "3rem",
              fontSize: "1.5rem",
            }}
            onClick={newGame}
          >
            New Game
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Canvas;
