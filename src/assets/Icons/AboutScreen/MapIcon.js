import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={26} height={34} viewBox="0 0 26 34" fill="none" {...props}>
      <Path
        d="M12.75 34S25.5 21.917 25.5 12.75a12.75 12.75 0 10-25.5 0C0 21.917 12.75 34 12.75 34zm0-14.875a6.375 6.375 0 110-12.75 6.375 6.375 0 010 12.75z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
