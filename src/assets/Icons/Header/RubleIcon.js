import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RubleIcon(props) {
  return (
    <Svg width={31} height={31} viewBox="0 0 31 31" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.402 30.183c-8.284 0-15-6.756-15-15.091C.402 6.755 7.118 0 15.402 0c8.285 0 15 6.756 15 15.091 0 8.336-6.715 15.092-15 15.092zm-5.156-15.81v1.705H11.9v2.46h-1.654v1.608H11.9v3.434h1.864v-3.434h3.75v-1.608h-3.75v-2.46h2.352a7.376 7.376 0 002.119-.292 4.775 4.775 0 001.7-.89 4.2 4.2 0 001.142-1.498c.28-.6.42-1.307.42-2.119 0-.811-.132-1.51-.396-2.094a3.932 3.932 0 00-1.095-1.45 4.623 4.623 0 00-1.678-.852 7.854 7.854 0 00-2.165-.28H11.9v7.77h-1.654zm5.916 0h-2.398V8.308h2.399c1.07 0 1.913.236 2.526.706.613.471.92 1.227.92 2.265 0 1.04-.307 1.815-.92 2.327-.613.511-1.456.767-2.526.767h-.001z"
        fill="#E8E8E8"
      />
    </Svg>
  )
}

export default RubleIcon
