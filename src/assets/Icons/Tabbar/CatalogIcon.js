import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CatalogIcon(props) {
  let fill = '#747474';
  if (props.focused) fill = '#BDBDBD';
  return (
    <Svg width={22} height={22} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M2.75 0a1 1 0 00-.863.496l-1.75 3A1 1 0 000 4v12c0 1.093.907 2 2 2h14c1.093 0 2-.907 2-2V4a1 1 0 00-.137-.504l-1.75-3A1.001 1.001 0 0015.25 0H2.75zm.574 2h11.352l1.166 2H2.158l1.166-2zM2 6h14v10H2V6zm4 2v2h6V8H6z"
        fill={fill}
      />
    </Svg>
  )
}

export default CatalogIcon
