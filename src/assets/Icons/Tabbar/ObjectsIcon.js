import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ObjectsIcon(props) {
  let fill = '#747474';
  if (props.focused) fill = '#BDBDBD';
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M16.5 1.833h-11a1.835 1.835 0 00-1.833 1.834V19.25a.917.917 0 00.916.917h12.834a.917.917 0 00.916-.917V3.667A1.835 1.835 0 0016.5 1.833zm0 16.5h-11V3.667h11v14.666z"
        fill={fill}
      />
      <Path
        d="M7.333 5.5h2.75v1.833h-2.75V5.5zm4.584 0h2.75v1.833h-2.75V5.5zM7.333 9.167h2.75V11h-2.75V9.167zm4.584.028h2.75V11h-2.75V9.195zm-4.584 3.638h2.75v1.834h-2.75v-1.834zm4.584 0h2.75v1.834h-2.75v-1.834z"
        fill={fill}
      />
    </Svg>
  )
}

export default ObjectsIcon
