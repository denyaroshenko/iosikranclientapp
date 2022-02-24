import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckSuccessIcon(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zm-3.97-3.03a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05h-.001z"
        fill="#078522"
        fillOpacity={0.9}
      />
    </Svg>
  )
}

export default CheckSuccessIcon
