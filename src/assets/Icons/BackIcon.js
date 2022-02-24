import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.734 7.184H3.164L10.688.652a.171.171 0 00-.112-.3H8.675a.345.345 0 00-.226.083L.33 7.48a.687.687 0 000 1.038l8.166 7.087a.17.17 0 00.112.043h1.966a.171.171 0 00.111-.3L3.164 8.816h12.57a.172.172 0 00.172-.171v-1.29a.172.172 0 00-.172-.171z"
        fill="#000"
      />
    </Svg>
  )
}

export default BackIcon
