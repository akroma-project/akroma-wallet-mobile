import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowdownSvg(props: any) {
  return (
    <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M16.75 0c8.753 0 16 7.263 16 16 0 8.753-7.263 16-16.016 16C7.997 32 .75 24.753.75 16c0-8.737 7.263-16 16-16zm.016 7.906c-.706 0-1.224.502-1.224 1.223v8.048l.141 3.435-1.615-1.945-1.914-1.93c-.22-.22-.533-.36-.863-.36-.674 0-1.176.517-1.176 1.176 0 .345.094.627.313.847l5.396 5.38c.33.33.597.455.942.455.36 0 .643-.14.957-.455l5.38-5.38c.22-.22.345-.502.345-.847 0-.659-.518-1.177-1.192-1.177-.345 0-.643.126-.863.361l-1.898 1.93-1.647 1.96.141-3.45V9.129c0-.721-.502-1.223-1.223-1.223z"
        fill="#DB0000"
      />
    </Svg>
  );
}
export default ArrowdownSvg;
