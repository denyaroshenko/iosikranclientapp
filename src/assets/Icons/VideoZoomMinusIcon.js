import * as React from "react"
import Svg, { Path } from "react-native-svg"

function VideoZoomMinusIcon(props) {

  const { color, opacity } = props

  return (
    <Svg
      // width={26}
      // height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.8 13H8.2"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M13 25c6.627 0 12-5.373 12-12S19.627 1 13 1 1 6.373 1 13s5.373 12 12 12z"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={2}
      />
    </Svg>
  )
}

VideoZoomMinusIcon.defaultProps = {
  color: "#1B1B1B",
  opacity: 0.7
}

export default VideoZoomMinusIcon
