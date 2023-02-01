import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  fill?: string;
}

function ArrowleftSvg(props: Props) {
  const { fill } = props;
  return (
    <Svg width={18} height={15} viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M0 7.5c0 .242.107.465.3.65l6.437 6.426c.194.184.397.271.63.271.475 0 .853-.348.853-.833a.849.849 0 00-.243-.61l-2.17-2.21-3.84-3.5-.203.475 3.121.194h12.262c.504 0 .853-.359.853-.863s-.349-.863-.853-.863H4.885l-3.12.194.203.485 3.838-3.509 2.171-2.21a.865.865 0 00.243-.61c0-.485-.378-.834-.853-.834-.233 0-.436.077-.65.29L.3 6.852a.889.889 0 00-.3.65z"
        fill={fill || '#1C1C1E'}
      />
    </Svg>
  );
}

export default ArrowleftSvg;
