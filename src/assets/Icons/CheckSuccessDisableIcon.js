import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckSuccessDisableIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.495a8.123 8.123 0 01-2.343 5.714A7.96 7.96 0 018 16.576a7.96 7.96 0 01-5.657-2.367A8.122 8.122 0 010 8.495c0-2.143.843-4.199 2.343-5.714A7.96 7.96 0 018 .414a7.96 7.96 0 015.657 2.367A8.123 8.123 0 0116 8.495zm-3.97-3.06a.749.749 0 00-.837-.155.75.75 0 00-.243.177l-3.473 4.47L5.384 7.81a.746.746 0 00-1.042.019.761.761 0 00-.018 1.052l2.646 2.674a.749.749 0 00.836.155.749.749 0 00.243-.176l3.992-5.04a.762.762 0 00-.01-1.06h-.001z"
        fill="#AEAEAE"
      />
    </Svg>
  )
}

export default CheckSuccessDisableIcon
