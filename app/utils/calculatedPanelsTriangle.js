export const calculatedPanelsTriangle = (roofBase, roofHeight, panelWidth, panelHeight) => {
  let totalPanels = 0;
  let currentHeight = 0;

  while (currentHeight + panelHeight <= roofHeight) {
    const reduction = (currentHeight / roofHeight) * (roofBase / 2);
    const horizontalSpace = roofBase - 2 * reduction;
 
    const numPanelsInRow = Math.floor(horizontalSpace / panelWidth);
    
    totalPanels += numPanelsInRow;
    currentHeight += panelHeight;
  }

  return totalPanels;
};
