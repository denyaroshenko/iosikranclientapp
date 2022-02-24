import * as React from "react"
import Svg, { Path } from "react-native-svg"

function VideoZoomPlusIcon(props) {

  const { color, opacity } = props

  return (
    <Svg
      // width={28}
      // height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14 9.333V14m0 0v4.667M14 14h4.667M14 14H9.333M14 25.667c6.443 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333 2.333 7.557 2.333 14 7.557 25.667 14 25.667z"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={2}
      />
    </Svg>
  )
}

VideoZoomPlusIcon.defaultProps = {
  color: "#1B1B1B",
  opacity: 0.7
}

export default VideoZoomPlusIcon
