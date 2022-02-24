import * as React from "react"
import Svg, { Path } from "react-native-svg"

function VideoZoomResetIcon(props) {

  const { color, opacity } = props

  return (
    <Svg
      // width={30}
      // height={26}
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.96 3.22A10.948 10.948 0 0117 2c6.075 0 11 4.925 11 11s-4.925 11-11 11S6 19.075 6 13h4L5 5l-5 8h4c0 7.18 5.82 13 13 13s13-5.82 13-13S24.18 0 17 0c-2.146 0-4.173.52-5.959 1.443l.918 1.777z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  )
}

VideoZoomResetIcon.defaultProps = {
  color: "#1B1B1B",
  opacity: 0.7
}

export default VideoZoomResetIcon
