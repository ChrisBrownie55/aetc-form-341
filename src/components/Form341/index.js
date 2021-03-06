import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

import { PAPER_341_WIDTH, PAPER_341_HEIGHT } from "../../constants";

import "./styles.css";

function Individual341({
  xIndex,
  yIndex,
  name,
  grade,
  organization,
  flight,
  mtlState
}) {
  const width = 912;
  const height = 680;

  const x = 98 + (width + 194) * xIndex;
  const y = 95 + (height + 161) * yIndex;

  return (
    <>
      {mtlState.matches('on') && (
        <>
          <Text text="MTL" fontSize={16} fontStyle="bold" x={x + 2} y={y - 30} />
          <Rect x={x + 45} y={y - 17} width={width / 4} height={1} fill="black" />
          <Text text={mtlState.context.mtl} fontSize={26} x={x + 45} y={y - 40} />

          <Text text="Transition Phase" fontSize={16} fontStyle="bold" x={x + width - 300} y={y - 30} />
          <Rect x={x + width - 165} y={y - 17} width={width / 12} height={1} fill="black" />
          <Text text={mtlState.context.transitionPhase} fontSize={26} x={x + width - 150} y={y - 40} />
        </>
      )}

      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="black"
        strokeWidth={3}
      />
      <Text
        text="EXCELLENCE/DISCREPENCY REPORT"
        fontSize={24}
        fontStyle="bold"
        x={x}
        y={y + 25}
        width={width}
        align="center"
      />

      <Rect x={x} y={y + 65} width={width} height={2} fill="black" />
      <Text
        text="LAST NAME - FIRST NAME - MIDDLE INITIAL"
        fontSize={16}
        x={x + 8}
        y={y + 82}
      />
      <Text text={name} fontSize={26} x={x + 8} y={y + 120} />

      <Rect x={x + 703} y={y + 66} width={2} height={100} fill="black" />
      <Text text="GRADE" fontSize={16} x={x + 714} y={y + 82} />
      <Text text={grade} fontSize={26} x={x + 714} y={y + 120} />

      <Rect x={x} y={y + 166} width={width} height={2} fill="black" />
      <Text text="ORGANIZATION" fontSize={16} x={x + 8} y={y + 183} />
      <Text text={organization} fontSize={26} x={x + 8} y={y + 221} />

      <Rect x={x + 538} y={y + 167} width={2} height={100} fill="black" />
      <Text
        text="CLASS/FLIGHT (If Applicable)"
        fontSize={16}
        x={x + 549}
        y={y + 183}
      />
      <Text text={flight} fontSize={26} x={x + 549} y={y + 221} />

      <Rect x={x} y={y + 267} width={width} height={2} fill="black" />
      <Text
        text="EXCELLENCE/DISCREPENCY"
        fontSize={16}
        x={x + 298}
        y={y + 276}
      />
      <Text
        text="(Be specific)"
        fontSize={16}
        fontStyle="italic"
        x={x + 535}
        y={y + 276}
      />
      <Rect x={x} y={y + 299} width={width} height={2} fill="black" />

      <Rect x={x} y={y + 501} width={width} height={2} fill="black" />
      <Text text="TIME" fontSize={16} x={x + 8} y={y + 518} />
      <Rect x={x + 200} y={y + 502} width={2} height={67} fill="black" />
      <Text text="DATE" fontSize={16} x={x + 212} y={y + 518} />
      <Rect x={x + 461} y={y + 502} width={2} height={67} fill="black" />
      <Text text="PLACE" fontSize={16} x={x + 473} y={y + 518} />

      <Rect x={x} y={y + 569} width={width} height={2} fill="black" />
      <Text
        text="PRINTED NAME OF REPORTING INDIVIDUAL"
        fontSize={16}
        x={x + 8}
        y={y + 585}
      />
      <Rect x={x + 461} y={y + 569} width={2} height={110} fill="black" />
      <Text
        text="SIGNATURE OF REPORTING INDIVIDUAL"
        fontSize={16}
        x={x + 473}
        y={y + 585}
      />

      <Text
        text="AETC FORM 341, 20070815"
        fontSize={16}
        x={x + 5}
        y={y + height + 8}
        fontStyle="bold"
      />
      <Text
        text="PREVIOUS EDITION IS OBSOLETE."
        fontSize={16}
        x={x + 5}
        y={y + height + 8}
        align="right"
        width={width - 18}
      />
    </>
  );
}

function Form341({ formData }) {
  return (
    <Stage
      className="Form341"
      width={PAPER_341_WIDTH}
      height={PAPER_341_HEIGHT}
    >
      <Layer>
        <Individual341 xIndex={0} yIndex={0} {...formData} />
        <Individual341 xIndex={1} yIndex={0} {...formData} />
        <Individual341 xIndex={0} yIndex={1} {...formData} />
        <Individual341 xIndex={1} yIndex={1} {...formData} />
      </Layer>
    </Stage>
  );
}

export default Form341;
