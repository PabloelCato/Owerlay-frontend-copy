import React, { SVGAttributes } from 'react';

type logoProps = SVGAttributes<SVGElement>;
const OwerlayMenuIcon: React.FC<logoProps> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <circle
        cx={4.5}
        cy={12}
        r={1}
        fill={props.fill ? props.fill : '#000000'}
      />
      <rect
        width={14}
        height={2}
        x={7.5}
        y={11}
        fill={props.fill ? props.fill : '#000000'}
        rx={0.94}
      />
      <rect
        width={18}
        height={2}
        x={3.5}
        y={16}
        fill={props.fill ? props.fill : '#000000'}
        rx={0.94}
      />
      <rect
        width={18}
        height={2}
        x={3.5}
        y={6}
        fill={props.fill ? props.fill : '#000000'}
        rx={0.94}
      />
    </svg>
  );
};

export default OwerlayMenuIcon;
