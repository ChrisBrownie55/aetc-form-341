import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

import useWindowSize from "@rooks/use-window-size";

import "./styles.css";

function percentageOf(value) {
  return percent => (percent / 100) * value;
}

const A4_PAPER = {
  WIDTH: 2480,
  HEIGHT: 3508
};

const percentageOfA4Width = percentageOf(A4_PAPER.WIDTH);
const percentageOfA4Height = percentageOf(A4_PAPER.HEIGHT);

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <h2>Your form:</h2>
      <Stage width={A4_PAPER.WIDTH} height={A4_PAPER.HEIGHT}>
        <Layer>
          <Rect
            x={percentageOfA4Width(5)}
            y={percentageOfA4Height(15)}
            width={percentageOfA4Width(30)}
            height={percentageOfA4Height(30)}
            fill="black"
          />
        </Layer>
      </Stage>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
