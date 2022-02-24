import * as React from "react"
import Svg, { Path } from "react-native-svg"

function VideoDefaultscreenIcon(props) {

  const { color, opacity } = props

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      enableBackground="new 0 0 32 32"
      {...props}
    >
      <Path
        d="M22.586 25.414L29.172 32 32 29.172 25.414 22.586 28 20 20 20 20 28z"
        fill={color}
        fillOpacity={opacity}
      />
      <Path
        d="M6.547 9.371L4 12 11.961 11.957 12 4 9.375 6.543 2.828 0 0 2.828z"
        fill={color}
        fillOpacity={opacity}
      />
      <Path
        d="M0 29.172L2.828 32 9.414 25.414 12 28 12 20 4 20 6.586 22.586z"
        fill={color}
        fillOpacity={opacity}
      />
      <Path
        d="M28.031 12L25.438 9.404 32 2.838 29.164 0 22.598 6.566 20 3.971 20 12z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  )
}

VideoDefaultscreenIcon.defaultProps = {
  color: "#1B1B1B",
  opacity: 0.7
}

export default VideoDefaultscreenIcon
