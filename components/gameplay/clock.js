/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
// import { classPrefixor } from 'utils/classPrefixor';
// const prefix = 'gamePage';
// export const c = classPrefixor(prefix);

const Clock = props => {
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ].join(' ');

    return d;
  };

  return (
    <svg width={400} height={400}>
      <path
        id="arc1"
        d={describeArc(
          150,
          150,
          50,
          0,
          props.time !== 15 ? (360 / 15) * props.time : 359.9999
        )}
        fill="none"
        stroke="#446688"
        strokeWidth="20"
      />
      <circle
        cx="150"
        cy="150"
        r="50"
        stroke="none"
        strokeWidth="0"
        fill="#f9bc60"
      />
      <text
        x="150"
        y="150"
        fill="#446688"
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="bold"
      >
        {props.time}
      </text>
    </svg>
  );
};

export default Clock;
