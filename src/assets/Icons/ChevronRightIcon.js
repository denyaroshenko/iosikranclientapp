import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChevronRightIcon(props) {
  return (
    <Svg width={13} height={18} viewBox="0 0 13 18" fill="none" {...props}>
      <Path
        d="M.963 15.885L7.875 9 .963 2.115 3.091 0l9.055 9-9.055 9-2.128-2.115z"
        fill="#747474"
      />
    </Svg>
  )
}

export default ChevronRightIcon