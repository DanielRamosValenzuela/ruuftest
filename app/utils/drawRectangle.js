import { getScale } from './getScale';

export const drawRectangle = (
  roofWidth,
  roofHeight,
  bestHorizontal,
  bestVertical,
  panelWidth,
  panelHeight
) => {
  const scale = getScale(roofWidth, roofHeight);
  const horizontalPanels = Math.floor(bestHorizontal / panelWidth);
  const verticalPanels = Math.floor(bestVertical / panelHeight);
  const usedWidthHorizontal = horizontalPanels * panelWidth * scale;
  const usedHeightVertical = verticalPanels * panelHeight * scale;

  let grid = [];

  grid.push(
    <div
      style={{
        position: 'absolute',
        width: `${roofWidth * scale}px`,
        height: `${roofHeight * scale}px`,
        backgroundColor: 'lightgrey',
        border: '2px solid black',
      }}
    />
  );

  // Añadir paneles horizontales
  for (let i = 0; i < horizontalPanels; i++) {
    for (let j = 0; j < roofWidth / panelWidth; j++) {
      grid.push(
        <div
          style={{
            position: 'absolute',
            left: `${j * panelWidth * scale}px`,
            top: `${i * panelHeight * scale}px`,
            width: `${panelWidth * scale - 2}px`,
            height: `${panelHeight * scale - 2}px`,
            backgroundColor: 'green',
            border: '1px solid white',
          }}
        />
      );
    }
  }

  for (let i = 0; i < verticalPanels; i++) {
    for (let j = 0; j < roofHeight / panelHeight; j++) {
      grid.push(
        <div
          style={{
            position: 'absolute',
            left: `${usedWidthHorizontal + i * panelHeight * scale}px`,
            top: `${j * panelWidth * scale}px`,
            width: `${panelHeight * scale - 2}px`,
            height: `${panelWidth * scale - 2}px`,
            backgroundColor: 'blue',
            border: '1px solid white',
          }}
        />
      );
    }
  }

  const remainingHeight = roofHeight * scale - usedHeightVertical;
  if (remainingHeight > 0) {
    grid.push(
      <div
        style={{
          position: 'absolute',
          left: `${usedWidthHorizontal}px`,
          top: `${usedHeightVertical}px`,
          width: `${roofWidth * scale - usedWidthHorizontal}px`,
          height: `${remainingHeight}px`,
          backgroundColor: 'gray',
        }}
      />
    );
  }

  return grid;
};
