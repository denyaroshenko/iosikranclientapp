import * as React from "react"
import Svg, { G, Circle, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function HelpIcon(props) {
  return (
    <Svg style={{ marginBottom: 10 }} width={78} height={67} viewBox="0 0 78 67" fill="none" {...props}>
      <G filter="url(#filter0_d)">
        <Circle cx={37} cy={33} r={31} fill="#DF5649" />
      </G>
      <Path
        d="M28.188 38h-.848v-4.772h-5.688V38h-.84v-9.953h.84v4.47h5.688v-4.47h.848V38zm8.032-4.772h-4.655v4.061h5.352V38h-6.193v-9.953h6.159v.718h-5.319v3.753h4.656v.71zm3.322 4.061h4.915V38h-5.763v-9.953h.848v9.242zm7.376-3.343V38h-.84v-9.953h3.39c1.034 0 1.85.264 2.447.793.602.529.902 1.255.902 2.18 0 .935-.289 1.657-.868 2.168-.574.505-1.408.758-2.502.758h-2.529zm0-.71h2.55c.815 0 1.438-.194 1.866-.582.428-.387.643-.927.643-1.62 0-.688-.215-1.235-.643-1.64-.424-.41-1.028-.62-1.812-.63h-2.604v4.471z"
        fill="#fff"
      />
      <Defs></Defs>
    </Svg>
  )
}

export default HelpIcon
