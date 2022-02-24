import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function ObjectIcon(props) {

  if (props.active) {
    return (
      <Svg width={18} height={20} viewBox="0 0 18 20" fill="none" {...props}>
        <Path
          d="M.563 9.063v10a.313.313 0 00.312.312h7.5a.312.312 0 00.313-.313v-10a.312.312 0 00-.313-.312H7.75v-.938a.312.312 0 00-.313-.312h-.312v-.938a.312.312 0 00-.313-.312H6.5v-.938A.312.312 0 006.187 5h-1.25v-.938a.312.312 0 10-.625 0V5h-1.25a.312.312 0 00-.312.313v.937h-.313a.312.312 0 00-.312.313V7.5h-.313a.312.312 0 00-.312.313v.937H.875a.312.312 0 00-.313.313zm5 9.687H3.688v-1.875h1.874v1.875zM3.374 5.625h2.5v.625h-2.5v-.625zm-.625 1.25H6.5V7.5H2.75v-.625zm-.625 1.25h5v.625h-5v-.625zm-.938 1.25h6.875v9.375H6.188v-2.188a.313.313 0 00-.313-.312h-2.5a.312.312 0 00-.313.313v2.187H1.188V9.375z"
          fill="url(#paint0_linear)"
        />
        <Path
          d="M17.438 19.063V.938a.312.312 0 00-.313-.313h-7.5a.312.312 0 00-.313.313v18.125a.313.313 0 00.313.312h7.5a.313.313 0 00.313-.313zm-2.5-.313h-3.126v-1.875h3.126v1.875zm1.874 0h-1.25v-2.188a.313.313 0 00-.312-.312H11.5a.313.313 0 00-.313.313v2.187h-1.25V1.25h6.876v17.5z"
          fill="url(#paint1_linear)"
        />
        <Path
          d="M6.813 10.313H2.438v.624h4.374v-.624z"
          fill="url(#paint2_linear)"
        />
        <Path
          d="M6.813 11.563H2.438v.624h4.374v-.624z"
          fill="url(#paint3_linear)"
        />
        <Path
          d="M6.813 12.813H2.438v.624h4.374v-.624z"
          fill="url(#paint4_linear)"
        />
        <Path
          d="M6.813 14.063H2.438v.624h4.374v-.624z"
          fill="url(#paint5_linear)"
        />
        <Path
          d="M10.875 4.375h1.875a.313.313 0 00.313-.313V2.188a.312.312 0 00-.313-.312h-1.875a.313.313 0 00-.313.313v1.874a.312.312 0 00.313.313zm.313-1.875h1.25v1.25h-1.25V2.5z"
          fill="url(#paint6_linear)"
        />
        <Path
          d="M14 4.375h1.875a.313.313 0 00.313-.313V2.188a.312.312 0 00-.313-.312H14a.313.313 0 00-.313.313v1.874a.312.312 0 00.313.313zm.313-1.875h1.25v1.25h-1.25V2.5z"
          fill="url(#paint7_linear)"
        />
        <Path
          d="M10.875 7.5h1.875a.313.313 0 00.313-.313V5.313A.312.312 0 0012.75 5h-1.875a.313.313 0 00-.313.313v1.875a.312.312 0 00.313.312zm.313-1.875h1.25v1.25h-1.25v-1.25z"
          fill="url(#paint8_linear)"
        />
        <Path
          d="M14 7.5h1.875a.313.313 0 00.313-.313V5.313A.312.312 0 0015.874 5H14a.313.313 0 00-.313.313v1.875A.312.312 0 0014 7.5zm.313-1.875h1.25v1.25h-1.25v-1.25z"
          fill="url(#paint9_linear)"
        />
        <Path
          d="M10.875 10.625h1.875a.313.313 0 00.313-.313V8.438a.312.312 0 00-.313-.313h-1.875a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25V10h-1.25V8.75z"
          fill="url(#paint10_linear)"
        />
        <Path
          d="M14 10.625h1.875a.313.313 0 00.313-.313V8.438a.312.312 0 00-.313-.313H14a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25V10h-1.25V8.75z"
          fill="url(#paint11_linear)"
        />
        <Path
          d="M10.875 13.75h1.875a.313.313 0 00.313-.313v-1.874a.313.313 0 00-.313-.313h-1.875a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25v1.25h-1.25v-1.25z"
          fill="url(#paint12_linear)"
        />
        <Path
          d="M14 13.75h1.875a.313.313 0 00.313-.313v-1.874a.313.313 0 00-.313-.313H14a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25v1.25h-1.25v-1.25z"
          fill="url(#paint13_linear)"
        />
        <Path
          d="M13.688 14.688h-.626v.624h.626v-.624z"
          fill="url(#paint14_linear)"
        />
        <Path
          d="M14.938 14.688h-.626v.624h.626v-.624z"
          fill="url(#paint15_linear)"
        />
        <Path
          d="M12.438 14.688h-.626v.624h.626v-.624z"
          fill="url(#paint16_linear)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1={-1}
            y1={11.5625}
            x2={19.3987}
            y2={11.5625}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear"
            x1={9.3125}
            y1={600.625}
            x2={539.68}
            y2={600.625}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear"
            x1={2.4375}
            y1={31.5625}
            x2={288.02}
            y2={31.5625}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear"
            x1={2.4375}
            y1={35.3125}
            x2={288.02}
            y2={35.3125}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear"
            x1={2.4375}
            y1={39.0625}
            x2={288.02}
            y2={39.0625}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear"
            x1={2.4375}
            y1={42.8125}
            x2={288.02}
            y2={42.8125}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint6_linear"
            x1={10.5625}
            y1={26.875}
            x2={173.752}
            y2={26.875}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint7_linear"
            x1={13.6875}
            y1={26.875}
            x2={176.877}
            y2={26.875}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint8_linear"
            x1={10.5625}
            y1={55}
            x2={173.752}
            y2={55}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint9_linear"
            x1={13.6875}
            y1={55}
            x2={176.877}
            y2={55}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint10_linear"
            x1={10.5625}
            y1={83.125}
            x2={173.752}
            y2={83.125}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint11_linear"
            x1={13.6875}
            y1={83.125}
            x2={176.877}
            y2={83.125}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint12_linear"
            x1={10.5625}
            y1={111.25}
            x2={173.752}
            y2={111.25}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint13_linear"
            x1={13.6875}
            y1={111.25}
            x2={176.877}
            y2={111.25}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint14_linear"
            x1={13.0625}
            y1={44.6875}
            x2={53.86}
            y2={44.6875}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint15_linear"
            x1={14.3125}
            y1={44.6875}
            x2={55.11}
            y2={44.6875}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
          <LinearGradient
            id="paint16_linear"
            x1={11.8125}
            y1={44.6875}
            x2={52.61}
            y2={44.6875}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FC4A1A" />
            <Stop offset={1} stopColor="#F7B733" />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  } else {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
        <Path
          d="M1.563 9.063v10a.313.313 0 00.312.312h7.5a.312.312 0 00.313-.313v-10a.312.312 0 00-.313-.312H8.75v-.938a.312.312 0 00-.313-.312h-.312v-.938a.312.312 0 00-.313-.312H7.5v-.938A.312.312 0 007.187 5h-1.25v-.938a.312.312 0 10-.625 0V5h-1.25a.312.312 0 00-.312.313v.937h-.313a.312.312 0 00-.312.313V7.5h-.313a.312.312 0 00-.312.313v.937h-.625a.312.312 0 00-.313.313zm5 9.687H4.688v-1.875h1.875v1.875zM4.374 5.625h2.5v.625h-2.5v-.625zm-.625 1.25H7.5V7.5H3.75v-.625zm-.625 1.25h5v.625h-5v-.625zm-.938 1.25h6.876v9.375H7.187v-2.188a.313.313 0 00-.312-.312h-2.5a.312.312 0 00-.313.313v2.187H2.188V9.375zM18.438 19.063V.938a.312.312 0 00-.313-.313h-7.5a.313.313 0 00-.313.313v18.125a.313.313 0 00.313.312h7.5a.313.313 0 00.313-.313zm-2.5-.313h-3.126v-1.875h3.126v1.875zm1.874 0h-1.25v-2.188a.313.313 0 00-.312-.312H12.5a.313.313 0 00-.313.313v2.187h-1.25V1.25h6.876v17.5z"
          fill="#BDBDBD"
        />
        <Path
          d="M7.813 10.313H3.438v.624h4.374v-.624zM7.813 11.563H3.438v.624h4.374v-.624zM7.813 12.813H3.438v.624h4.374v-.624zM7.813 14.063H3.438v.624h4.374v-.624zM11.875 4.375h1.875a.313.313 0 00.313-.313V2.188a.312.312 0 00-.313-.312h-1.875a.313.313 0 00-.313.313v1.874a.312.312 0 00.313.313zm.313-1.875h1.25v1.25h-1.25V2.5zM15 4.375h1.875a.313.313 0 00.313-.313V2.188a.312.312 0 00-.313-.312H15a.313.313 0 00-.313.313v1.874a.312.312 0 00.313.313zm.313-1.875h1.25v1.25h-1.25V2.5zM11.875 7.5h1.875a.313.313 0 00.313-.313V5.313A.312.312 0 0013.75 5h-1.875a.313.313 0 00-.313.313v1.875a.312.312 0 00.313.312zm.313-1.875h1.25v1.25h-1.25v-1.25zM15 7.5h1.875a.313.313 0 00.313-.313V5.313A.312.312 0 0016.875 5H15a.313.313 0 00-.313.313v1.875A.312.312 0 0015 7.5zm.313-1.875h1.25v1.25h-1.25v-1.25zM11.875 10.625h1.875a.313.313 0 00.313-.313V8.438a.312.312 0 00-.313-.313h-1.875a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25V10h-1.25V8.75zM15 10.625h1.875a.313.313 0 00.313-.313V8.438a.312.312 0 00-.313-.313H15a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25V10h-1.25V8.75zM11.875 13.75h1.875a.313.313 0 00.313-.313v-1.874a.313.313 0 00-.313-.313h-1.875a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25v1.25h-1.25v-1.25zM15 13.75h1.875a.313.313 0 00.313-.313v-1.874a.313.313 0 00-.313-.313H15a.313.313 0 00-.313.313v1.874a.313.313 0 00.313.313zm.313-1.875h1.25v1.25h-1.25v-1.25zM14.688 14.688h-.626v.624h.626v-.624zM15.938 14.688h-.626v.624h.626v-.624zM13.438 14.688h-.626v.624h.626v-.624z"
          fill="#BDBDBD"
        />
      </Svg>
    )
  }


}

export default ObjectIcon
