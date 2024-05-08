export const calculatedPanelsRectangle = (roofWidth, roofHeight, panelWidth, panelHeight) => { 
  let maxPanels = 0;
  let bestConfiguration = {
    vertical: 0,
    horizontal: 0,
  };

  for (let v = 0; v <= Math.floor(roofWidth / panelHeight); v++) {
    const remainingWidth = roofWidth - v * panelHeight;
    const verticalCount = v * Math.floor(roofHeight / panelWidth);
    const horizontalCount =
      remainingWidth > 0
        ? Math.floor(remainingWidth / panelWidth) *
          Math.floor(roofHeight / panelHeight)
        : 0;
    const totalPanels = verticalCount + horizontalCount;

    if (totalPanels > maxPanels) {
      maxPanels = totalPanels;
      bestConfiguration = {
        vertical: verticalCount,
        horizontal: horizontalCount,
      };
    }
  }

  for (let h = 0; h <= Math.floor(roofWidth / panelWidth); h++) {
    const remainingWidth = roofWidth - h * panelWidth;
    const horizontalCount = h * Math.floor(roofHeight / panelHeight);
    const verticalCount =
      remainingWidth > 0
        ? Math.floor(remainingWidth / panelHeight) *
          Math.floor(roofHeight / panelWidth)
        : 0;
    const totalPanels = horizontalCount + verticalCount;

    if (totalPanels > maxPanels) {
      maxPanels = totalPanels;
      bestConfiguration = {
        horizontal: horizontalCount,
        vertical: verticalCount,
      };
    }
  }
  return({
    maxPanels,
    bestVertical: bestConfiguration.vertical,
    bestHorizontal: bestConfiguration.horizontal,
  });
};