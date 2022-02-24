import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function DotsVerticalIcon(props) {
  return (
    <Svg width={6} height={26} viewBox="0 0 6 26" fill="none" {...props}>
      <Circle cx={3} cy={3} r={3} fill="#353535" />
      <Circle cx={3} cy={13} r={3} fill="#353535" />
      <Circle cx={3} cy={23} r={3} fill="#353535" />
    </Svg>
  )
}

export default DotsVerticalIcon
