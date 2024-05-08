const TriangleVisualization = ({
  roofBase,
  roofHeight,
  panelWidth,
  panelHeight,
  maxPanels
}) => {
  if (!roofBase || !roofHeight || !panelWidth || !panelHeight || !maxPanels) {
    return (
      <p className='pt-5 text-red-500'>
        Por favor ingresa todos los valores correctamente para visualizar el
        techo.
      </p>
    );
  }

  const svgWidth = 300;
  const svgHeight = 150;
  const scaleX = svgWidth / roofBase;
  const scaleY = svgHeight / roofHeight;

  const roofPath = `M0,${svgHeight} L${svgWidth / 2},0 L${svgWidth},${svgHeight} Z`;
  let panels = [];
  let currentHeight = 0;
  let panelCount = 0;

  while (currentHeight + panelHeight <= roofHeight && panelCount < maxPanels) {
    const reduction = (currentHeight / roofHeight) * (roofBase / 2);
    const horizontalSpace = roofBase - 2 * reduction;
    const startX = (roofBase - horizontalSpace) / 2;

    const numPanelsInRow = Math.floor(horizontalSpace / panelWidth);
    for (let i = 0; i < numPanelsInRow && panelCount < maxPanels; i++) {
      const x = (startX + i * panelWidth) * scaleX;
      const y = svgHeight - (currentHeight + panelHeight) * scaleY;
      panels.push(
        <rect
          key={`panel-${currentHeight}-${i}`}
          x={x}
          y={y}
          width={panelWidth * scaleX}
          height={panelHeight * scaleY}
          fill="#ADD8E6"
          stroke="black"
          strokeWidth="0.5"
        />
      );
      panelCount++;
    }

    currentHeight += panelHeight;
  }

  return (
    <svg width={svgWidth} height={svgHeight} className="mt-5">
      <path d={roofPath} fill='lightgrey' />
      {panels}
    </svg>
  );
};

export default TriangleVisualization;
