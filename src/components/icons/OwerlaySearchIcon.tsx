import React, { SVGAttributes } from 'react';

type logoProps = SVGAttributes<SVGElement>;
const OwerlaySearchIcon: React.FC<logoProps> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        fill={props.fill ? props.fill : '#000000'}
        fillRule="evenodd"
        d="m17.81 15.9 3.4 3.39a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0l-3.39-3.4A7.92 7.92 0 0 1 11.5 19a8 8 0 1 1 8-8 7.92 7.92 0 0 1-1.69 4.9ZM11.5 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default OwerlaySearchIcon;
