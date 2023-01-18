import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CopyIconSvg(props: any) {
  return (
    <Svg width={14} height={18} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M3.32 4.568h1.103V2.946c0-.678.362-1.068 1.074-1.068h3.026V5.39c0 .794.384 1.17 1.17 1.17h3.205v5.854c0 .684-.37 1.068-1.082 1.068h-1.349v1.102h1.41c1.411 0 2.123-.726 2.123-2.15V6.875c0-.842-.171-1.376-.685-1.903L9.858 1.46C9.372.96 8.798.775 8.065.775H5.443c-1.41 0-2.123.726-2.123 2.15v1.643zm6.196.657V2.418l3.094 3.15H9.851c-.24 0-.335-.103-.335-.343zM0 15.85C0 17.281.705 18 2.122 18h6.435c1.418 0 2.123-.726 2.123-2.15v-5.346c0-.877-.103-1.26-.65-1.821L6.256 4.842c-.52-.534-.951-.65-1.718-.65H2.122C.712 4.192 0 4.91 0 6.342v9.508zm1.102-.02V6.355c0-.671.363-1.061 1.075-1.061h2.246v3.97c0 .863.438 1.294 1.287 1.294h3.868v5.272c0 .684-.37 1.068-1.075 1.068H2.17c-.705 0-1.068-.384-1.068-1.068zM5.84 9.525c-.274 0-.384-.11-.384-.384V5.547l3.91 3.978H5.84z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CopyIconSvg;
