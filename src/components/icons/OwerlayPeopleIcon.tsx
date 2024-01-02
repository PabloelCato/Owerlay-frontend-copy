import React, { SVGAttributes } from 'react';

type logoProps = SVGAttributes<SVGElement>;
const OwerlayPeopleIcon: React.FC<logoProps> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill={props.fill ? props.fill : '#000000'}
        d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 20a1 1 0 0 0 1-1 5 5 0 0 0-8.06-3.95A7 7 0 0 0 2 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1"
      />
    </svg>
  );
};

export default OwerlayPeopleIcon;
