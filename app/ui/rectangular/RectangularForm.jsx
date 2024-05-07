'use client';

import React, { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

const RectangularForm = () => {
  const [inputs, setInputs] = useState({
    roofWidth: '',
    roofHeight: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [calculatedInputs, setCalculatedInputs] = useState({
    roofWidth: '',
    roofHeight: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [result, setResult] = useState(null);
  const [scale, setScale] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const calculatePanels = () => {
    const { roofWidth, roofHeight, panelWidth, panelHeight } = inputs;
    const w = parseInt(roofWidth);
    const h = parseInt(roofHeight);
    const pw = parseInt(panelWidth);
    const ph = parseInt(panelHeight);

    // Cálculo de paneles en ambas orientaciones
    let primaryHorizontal = Math.floor(w / pw) * Math.floor(h / ph);
    let remainingWidthHorizontal = w % pw;
    let remainingHeightHorizontal = h % ph;
    let secondaryVertical =
      Math.floor(remainingWidthHorizontal / ph) * Math.floor(h / pw) +
      Math.floor(remainingHeightHorizontal / pw) * Math.floor(w / ph);

    let primaryVertical = Math.floor(w / ph) * Math.floor(h / pw);
    let remainingWidthVertical = w % ph;
    let remainingHeightVertical = h % pw;
    let secondaryHorizontal =
      Math.floor(remainingWidthVertical / pw) * Math.floor(h / ph) +
      Math.floor(remainingHeightVertical / ph) * Math.floor(w / pw);

    setResult(
      Math.max(
        primaryHorizontal + secondaryVertical,
        primaryVertical + secondaryHorizontal
      )
    );
    const maxScaleWidth = 800;
    const maxScaleHeight = 600;

    const scaleWidth = maxScaleWidth / calculatedInputs.roofWidth;
    const scaleHeight = maxScaleHeight / calculatedInputs.roofHeight;
    setCalculatedInputs(inputs);
    setScale(Math.min(scaleWidth, scaleHeight));
  };

  return (
    <div className='flex flex-col items-center justify-center mt-5'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
        <div className='mb-4'>
          <label
            className='block text-grey-darker text-sm font-bold mb-2'
            htmlFor='roofWidth'
          >
            Ancho del techo (metros)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            id='roofWidth'
            name='roofWidth'
            type='number'
            placeholder='Ancho'
            value={inputs.roofWidth}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-grey-darker text-sm font-bold mb-2'
            htmlFor='roofHeight'
          >
            Alto del techo (metros)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            id='roofHeight'
            name='roofHeight'
            type='number'
            placeholder='Alto'
            value={inputs.roofHeight}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-grey-darker text-sm font-bold mb-2'
            htmlFor='panelWidth'
          >
            Ancho del panel solar (metros)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            id='panelWidth'
            name='panelWidth'
            type='number'
            placeholder='Ancho del panel'
            value={inputs.panelWidth}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-grey-darker text-sm font-bold mb-2'
            htmlFor='panelHeight'
          >
            Alto del panel solar (metros)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            id='panelHeight'
            name='panelHeight'
            type='number'
            placeholder='Alto del panel'
            value={inputs.panelHeight}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
            type='button'
            onClick={calculatePanels}
          >
            Calcular
          </button>
        </div>
        {result !== null && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <div
              className='mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-4/5 '
              role='alert'
            >
              <strong className='font-bold'>Resultado: </strong>
              <span className='block sm:inline'>
                {result} paneles pueden ser colocados.
              </span>
            </div>
            <div>
              <Stage
                width={calculatedInputs.roofWidth * scale}
                height={calculatedInputs.roofHeight * scale}
              >
                <Layer>
                  {[...Array(result)].map((_, i) => (
                    <Rect
                      key={i}
                      x={
                        (i %
                          Math.floor(
                            calculatedInputs.roofWidth /
                              calculatedInputs.panelWidth
                          )) *
                        calculatedInputs.panelWidth *
                        scale
                      }
                      y={
                        Math.floor(
                          i /
                            Math.floor(
                              calculatedInputs.roofWidth /
                                calculatedInputs.panelWidth
                            )
                        ) *
                        calculatedInputs.panelHeight *
                        scale
                      }
                      width={calculatedInputs.panelWidth * scale}
                      height={calculatedInputs.panelHeight * scale}
                      fill='yellow'
                      stroke='black'
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RectangularForm;
