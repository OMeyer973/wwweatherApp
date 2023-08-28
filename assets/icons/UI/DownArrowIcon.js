import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const DownArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M7.41 8.59003L12 13.17L16.59 8.59003L18 10L12 16L6 10L7.41 8.59003Z"
      fill={props.color ? props.color : "#262626"}
    />
  </Svg>
)

export default DownArrowIcon;
