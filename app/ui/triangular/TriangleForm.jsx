'use client'

import React, { useState } from 'react';
import { Layer, Rect, Stage, Line } from 'react-konva';

const TriangleForm = () => {
  const [inputs, setInputs] = useState({
    roofBase: '',
    roofHeight: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [result, setResult] = useState(null);
  const [panelsLayout, setPanelsLayout] = useState([]);
  const [scale, setScale] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const calculatePanels = () => {
    const { roofBase, roofHeight, panelWidth, panelHeight } = inputs;
    const base = parseInt(roofBase);
    const height = parseInt(roofHeight);
    const pw = parseInt(panelWidth);
    const ph = parseInt(panelHeight);

    let totalPanels = 0;
    let panels = [];
    let currentY = 0;

    while (currentY + ph <= height) {
      const effectiveWidth = base - (2 * (currentY / height) * (base / 2));
      const numPanels = Math.floor(effectiveWidth / pw);
      panels.push({ numPanels, y: currentY, effectiveWidth });
      totalPanels += numPanels;
      currentY += ph;
    }

    setResult(totalPanels);
    setPanelsLayout(panels);
    const maxScaleWidth = 800;
    const maxScaleHeight = 600;

    const scaleWidth = maxScaleWidth / base;
    const scaleHeight = maxScaleHeight / height;
    setScale(Math.min(scaleWidth, scaleHeight));
  };

  return (
    <div className='flex flex-col items-center justify-center mt-5'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
        <div className='mb-4'>
          <label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='roofBase'>
            Ancho de la base del techo (metros)
          </label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' id='roofBase' name='roofBase' type='number' placeholder='Ancho de la base' value={inputs.roofBase} onChange={handleInputChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='roofHeight'>
            Altura del techo (metros)
          </label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' id='roofHeight' name='roofHeight' type='number' placeholder='Altura' value={inputs.roofHeight} onChange={handleInputChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='panelWidth'>
            Ancho del panel solar (metros)
          </label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' id='panelWidth' name='panelWidth' type='number' placeholder='Ancho del panel' value={inputs.panelWidth} onChange={handleInputChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='panelHeight'>
            Alto del panel solar (metros)
          </label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' id='panelHeight' name='panelHeight' type='number' placeholder='Alto del panel' value={inputs.panelHeight} onChange={handleInputChange} />
        </div>
        <div className='flex items-center justify-between'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full' type='button' onClick={calculatePanels}>
            Calcular
          </button>
        </div>
        {result !== null && (
          <div style={{ width: '100%', overflowX: 'auto', border: '1px solid black' }}>
            <Stage width={inputs.roofBase * scale} height={inputs.roofHeight * scale}>
              <Layer>
                <Line points={[0, inputs.roofHeight * scale, inputs.roofBase * scale / 2, 0, inputs.roofBase * scale, inputs.roofHeight * scale]} stroke="black" strokeWidth={4} closed />
                {panelsLayout.map((row, idx) => (
                  <React.Fragment key={idx}>
                    {[...Array(row.numPanels)].map((_, i) => (
                      <Rect
                        key={i}
                        x={(inputs.roofBase * scale - row.effectiveWidth * scale) / 2 + i * pw * scale}
                        y={row.y * scale}
                        width={pw * scale}
                        height={ph * scale}
                        fill="yellow"
                        stroke="black"
                      />
                    ))}
                  </React.Fragment>
                ))}
              </Layer>
            </Stage>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriangleForm;
