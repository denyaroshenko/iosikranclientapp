import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function SplashScreenLogo(props) {
  return (
    <Svg
      width={156}
      height={47}
      viewBox="0 0 156 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0)" d="M0 0H156V47H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0"
            transform="matrix(.00335 0 0 .01111 -.002 0)"
          />
        </Pattern>
        <Image
          id="image0"
          width={300}
          height={90}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  )
}

export default SplashScreenLogo