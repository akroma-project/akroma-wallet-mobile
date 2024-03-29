import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function AkaIcon(props: any) {
  return (
    <Svg width={props.size ? props.size : 33} height={props.size ? props.size : 33} viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G clipPath="url(#clip0_188_1634)">
        <Path d="M.97.065L.219 2.128l5.27 22.512 1.14-1.47L1.698.784.97.064z" fill="#D5D5D5" />
        <Path d="M5.489 24.64l25.068 5.565 1.78-1.063-1.74-.781-23.902-5.316-1.206 1.595z" fill="#E7E7E7" />
        <Path d="M.97.065L25.047 7.35l7.29 21.792-25.848-5.784L.971.065z" fill="#fff" />
        <Path d="M28.338 25.046l.407 1.314-20.17-4.697L3.85 2.63l.446.656 4.318 1.251 3.625 13.82 15.346 3.877.753 2.813z" fill="#AA0087" />
        <Path d="M9 4.155l-.046.256-.473.213-4.425-1.245-.206-.75L9 4.155z" fill="#930077" />
        <Path d="M9 4.155l-.519.469L12.166 18.5l.42-.02.206-.187-.086-.219L9 4.154z" fill="#74005E" />
        <Path d="M28.059 21.895v.4l-.34.063-.22-.013L12.166 18.5l.54-.425 15.353 3.82z" fill="#930077" />
        <Path d="M28.058 21.895l-.56.45 1.247 4.015.86.194-1.547-4.659z" fill="#74005E" />
        <Path d="M17.703 13.778l-2.039-7.116-4.138-1.707 3.178 11.462 11.948 3.09.247-.151-1.44-3.627-7.756-1.95z" fill="#F10000" />
        <Path d="M16.177 6.35l-.033.25-.407.25-.146-.1-3.898-1.15-.167-.645 4.651 1.395z" fill="#CF0000" />
        <Path d="M17.69 13.79l-2.1-7.04.587-.4 2.006 6.94.087.126-.58.375z" fill="#AF0000" />
        <Path d="M17.69 13.79l7.663 2.083.107.169.413-.438-.047-.269-7.643-2.045-.493.5z" fill="#CF0000" />
        <Path d="M26.586 19.5l-1.233-3.627.473-.538 1.5 4.315-.74-.15z" fill="#AF0000" />
        <Path d="M23.134 8.85l-4.451-1.187 1.166 4.064 4.518 1.25L23.2 8.914l-.067-.062z" fill="#FFA600" />
        <Path d="M23.68 8.538l-5.204-1.5.207.624 4.384 1.251.273.063.274-.188.066-.25z" fill="#F17100" />
        <Path d="M23.68 8.538l-.62.375 1.307 4.065.753.187-1.44-4.627z" fill="#E25D00" />
      </G>
      <Defs>
        <ClipPath id="clip0_188_1634">
          <Path fill="#fff" transform="translate(.148)" d="M0 0H32.2573V30.2703H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AkaIcon;
