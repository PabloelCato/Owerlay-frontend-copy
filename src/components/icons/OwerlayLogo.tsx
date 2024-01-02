import React, { SVGAttributes } from 'react';

type logoProps = SVGAttributes<SVGElement>;
const OwerlayLogo: React.FC<logoProps> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : 39}
      height={props.height ? props.height : 38}
      viewBox="0 0 39 38"
      fill="none"
    >
      <path
        fill={props.fill ? props.fill : '#000000'}
        d="M19.5.234C9.145.234.75 8.628.75 18.984c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75C38.25 8.627 29.855.233 19.5.233Zm-1.719 34.91a16.277 16.277 0 0 1-13.255-9.836l-.083-.202 13.338 7.466v2.572Zm0-5.436L3.476 21.698a16.393 16.393 0 0 1-.154-4.252l14.46 8.094v4.166Zm0-7.032L3.783 14.84a16.121 16.121 0 0 1 1.21-3.185l12.788 7.167v3.854Zm0-6.72-11.49-6.44a16.361 16.361 0 0 1 2.312-2.588l9.178 5.026v4.002Zm0-6.852L10.778 5.27a16.168 16.168 0 0 1 7.003-2.446v6.281Zm17.969 9.88a16.233 16.233 0 0 1-15.469 16.23V2.753A16.234 16.234 0 0 1 35.75 18.984Z"
      />
    </svg>
  );
};

export default OwerlayLogo;
