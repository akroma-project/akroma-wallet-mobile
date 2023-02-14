import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowDownSelectSvg(props) {
  return (
    <Svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M1.707.293A1 1 0 00.293 1.707l6 6a1 1 0 001.414 0l6-6A1 1 0 0012.293.293L7 5.586 1.707.293z" fill="#1C1C1E" />
    </Svg>
  );
}

export default ArrowDownSelectSvg;
