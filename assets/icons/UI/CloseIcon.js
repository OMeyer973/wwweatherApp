import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CloseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      style={{
        fill: props.color ? props.color : "#262626"
      }}
      d="M18 7.4 16.6 6 12 10.6 7.4 6 6 7.4l4.6 4.6L6 16.6 7.4 18l4.6-4.6 4.6 4.6 1.4-1.4-4.6-4.6z"
    />
  </Svg>
)

export default CloseIcon;
