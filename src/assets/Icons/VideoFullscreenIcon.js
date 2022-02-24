import * as React from "react"
import Svg, { Path } from "react-native-svg"

function VideoFullscreenIcon(props) {

  const { color, opacity } = props

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      enableBackground="new 0 0 512 512"
      {...props}
    >
      <Path fill={color} fillOpacity={opacity} d="M128 32V0H16C7.163 0 0 7.163 0 16v112h32V54.56L180.64 203.2l22.56-22.56L54.56 32H128zM496 0H384v32h73.44L308.8 180.64l22.56 22.56L480 54.56V128h32V16c0-8.837-7.163-16-16-16zM480 457.44L331.36 308.8l-22.56 22.56L457.44 480H384v32h112c8.837 0 16-7.163 16-16V384h-32v73.44zM180.64 308.64L32 457.44V384H0v112c0 8.837 7.163 16 16 16h112v-32H54.56L203.2 331.36l-22.56-22.72z" />
    </Svg>
  )
}

VideoFullscreenIcon.defaultProps = {
  color: "#1B1B1B",
  opacity: 0.7
}

export default VideoFullscreenIcon
