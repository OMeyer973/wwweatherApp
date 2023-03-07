import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const RightArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M8.3,16.9l4.6-4.6L8.3,7.7l1.4-1.4l6,6l-6,6L8.3,16.9z"
      fill={props.color ? props.color : "#262626"}
    />
  </Svg>
)

export default RightArrowIcon;
