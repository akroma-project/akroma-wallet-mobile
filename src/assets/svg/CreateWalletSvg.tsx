import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CreateWalletSvg(props: any) {
  return (
    <Svg width="16" height="22" viewBox="0 0 16 22" fill="none" {...props}>
      <Path
        d="M2.94887 21.1975H13.0511C15.0107 21.1975 16 20.1987 16 18.2201V3.78966C16 1.80155 15.0202 0.802734 13.0511 0.802734H10.226C9.9025 0.802734 9.69324 1.03103 9.69324 1.37348C9.69324 2.36279 9.00838 3.05719 8.00002 3.05719C6.99169 3.05719 6.29728 2.36279 6.29728 1.37348C6.29728 1.03103 6.088 0.802734 5.76458 0.802734H2.94887C0.979787 0.802734 0 1.80155 0 3.78966V18.2201C0 20.1987 0.9893 21.1975 2.94887 21.1975ZM3.02497 19.666C2.03567 19.666 1.53151 19.1333 1.53151 18.1916V3.8182C1.53151 2.86695 2.03567 2.33425 3.02497 2.33425H5.73604L4.85138 1.79203C5.0226 3.45672 6.25923 4.54115 8.00002 4.54115C9.7408 4.54115 10.9774 3.45672 11.1582 1.79203L10.264 2.33425H12.9751C13.9643 2.33425 14.4685 2.86695 14.4685 3.8182V18.1916C14.4685 19.1333 13.9643 19.666 12.9751 19.666H3.02497ZM4.39477 7.88955H11.6148C11.9477 7.88955 12.195 7.63271 12.195 7.29026C12.195 6.96684 11.9477 6.71 11.6148 6.71H4.39477C4.05233 6.71 3.805 6.96684 3.805 7.29026C3.805 7.63271 4.05233 7.88955 4.39477 7.88955ZM4.39477 11.2665H7.80976C8.15224 11.2665 8.39958 11.0096 8.39958 10.6862C8.39958 10.3533 8.15224 10.0964 7.80976 10.0964H4.39477C4.05233 10.0964 3.805 10.3533 3.805 10.6862C3.805 11.0096 4.05233 11.2665 4.39477 11.2665Z"
        fill="#1C1C1E"
      />
    </Svg>
  );
}

export default CreateWalletSvg;
