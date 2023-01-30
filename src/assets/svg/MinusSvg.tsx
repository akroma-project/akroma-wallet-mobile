import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

function MinusSvg(props: any) {
  return (
    <Svg width={37} height={5} viewBox="0 0 37 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={0.5} width={36} height={5} rx={2.5} fill="#B9B9B9" />
    </Svg>
  );
}

export default MinusSvg;
