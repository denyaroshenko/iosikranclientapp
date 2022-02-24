import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props) {
  let fill = '#747474';
  if (props.focused) fill = '#BDBDBD';
  return (
    <Svg width={22} height={22} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M15.469 17.637H1.719A1.72 1.72 0 010 15.917V7.973A1.722 1.722 0 01.563 6.7L7.437.45a1.712 1.712 0 012.313 0l6.875 6.25a1.722 1.722 0 01.563 1.272v7.946a1.72 1.72 0 01-1.72 1.719zM2.063 15.574h13.062v-7.45L8.593 2.186l-6.53 5.938v7.45z"
        fill={fill}
      />
    </Svg>
  )
}

export default HomeIcon
