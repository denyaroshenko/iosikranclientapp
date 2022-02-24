import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RegisterLinkIcon(props) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M6 1.425a1.575 1.575 0 110 3.15 1.575 1.575 0 010-3.15zm0 6.75c2.227 0 4.575 1.095 4.575 1.575v.825h-9.15V9.75c0-.48 2.348-1.575 4.575-1.575zM6 0a3 3 0 100 6 3 3 0 100-6zm0 6.75c-2.002 0-6 1.005-6 3V12h12V9.75c0-1.995-3.998-3-6-3z"
        fill="#FC4A1A"
      />
    </Svg>
  )
}

export default RegisterLinkIcon
