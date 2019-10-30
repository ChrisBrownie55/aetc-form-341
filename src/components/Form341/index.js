import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

import { percentageOf } from '../../utilities';
import { PAPER_341_WIDTH, PAPER_341_HEIGHT } from '../../constants';

import './styles.css';

function Individual341() {
  const x = 98;
  const y = 95;

  const width = 912;
  const height = 680;

  return (
    <Layer>
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
      <Rect x={x} y={y + 65} width={width} height={1} fill="black" />
      <Text
        text="LAST NAME - FIRST NAME - MIDDLE INITIAL"
        fontSize={18}
        x={x + 8}
        y={y + 82}
      />
      <Rect x={x + 703} y={y + 66} width={2} height={99} fill="black" />
      <Text text="GRADE" fontSize={18} x={x + 714} y={y + 82} />
      <Rect x={x} y={y + 166} width={width} height={2} fill="black" />
      <Text text="ORGANIZATION" fontSize={18} x={x + 8} y={y + 183} />
      <Rect x={x + 538} y={y + 167} width={2} height={99} fill="black" />
      <Text
        text="CLASS/FLIGHT (If Applicable)"
        fontSize={18}
        x={x + 549}
        y={y + 183}
      />
      <Rect x={x} y={y + 267} width={width} height={2} fill="black" />
      <Text
        text="EXCELLENCE/DISCREPENCY (Be specific)"
        fontSize={24}
        fontStyle="bold"
        x={x}
        y={y + 276}
        width={width}
        align="center"
      />
      <Rect x={x} y={y + 299} width={width} height={2} fill="black" />
    </Layer>
  );
}

function Form341() {
  return (
    <Stage
      className="Form341"
      width={PAPER_341_WIDTH}
      height={PAPER_341_HEIGHT}
    >
      <Individual341 />
    </Stage>
  );
}

export default Form341;
