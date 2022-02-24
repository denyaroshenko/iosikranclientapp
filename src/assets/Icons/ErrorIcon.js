import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ErrorIcon(props) {
  return (
    <Svg
      width={49}
      height={47}
      viewBox="0 0 49 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M48.368 44.051L26.025 1.083a1.719 1.719 0 00-3.05 0L.633 44.05a1.719 1.719 0 001.524 2.511h44.688a1.718 1.718 0 001.524-2.51zM22.566 13.906h3.868v17.188h-3.867V13.906zm1.934 27.5a2.578 2.578 0 110-5.156 2.578 2.578 0 010 5.156z"
        fill="#CCC"
      />
    </Svg>
  )
}

export default ErrorIcon
