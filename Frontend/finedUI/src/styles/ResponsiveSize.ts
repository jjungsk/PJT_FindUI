import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const FIGMA_WINDOW_WIDTH = 360;
const FIGMA_WINDOW_HEIGHT = 800;

function widthPercentage(width: number): number {
  const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;
  return responsiveScreenWidth(percentage);
}

function heightPercentage(height: number): number {
  const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;
  return responsiveScreenHeight(percentage);
}

function fontPercentage(size: number): number {
  const percentage = size * 0.135;
  return responsiveScreenFontSize(percentage);
}

export {widthPercentage, heightPercentage, fontPercentage};
