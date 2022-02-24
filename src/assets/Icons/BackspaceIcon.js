import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackspaceIcon(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.375 5.625H9.637a2.261 2.261 0 00-1.93 1.092L1.286 17.421a1.126 1.126 0 000 1.158l6.422 10.703a2.261 2.261 0 001.93 1.093h20.738a2.253 2.253 0 002.25-2.25V7.875a2.253 2.253 0 00-2.25-2.25zM8.672 28.704l.965-.579-.965.579zm21.703-.579H9.637L3.562 18 9.637 7.875h20.738v20.25zm-15.42-7.546L17.534 18l-2.58-2.58a1.125 1.125 0 111.591-1.59l2.58 2.579 2.58-2.58a1.125 1.125 0 111.59 1.591L20.716 18l2.58 2.58a1.126 1.126 0 01-1.591 1.59l-2.58-2.579-2.58 2.58a1.124 1.124 0 11-1.59-1.592z"
        fill="#000"
      />
    </Svg>
  )
}

export default BackspaceIcon
