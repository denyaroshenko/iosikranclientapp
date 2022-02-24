import * as React from "react"

function SvgComponent(props) {
  return ( 
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 17 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 6.625l5.625 5.625L16 1"
        stroke="#1F9138"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent
