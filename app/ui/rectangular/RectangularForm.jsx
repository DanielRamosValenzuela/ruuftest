'use client';

import React, { useState } from 'react';
import { calculatedPanelsRectangle } from '../../utils/calculatedPanelsRectangle';
import { getScale } from '@/app/utils/getScale';
import { drawRectangle } from '@/app/utils/drawRectangle';

const RectangularForm = () => {
  const [inputs, setInputs] = useState({
    roofWidth: '',
    roofHeight: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [calculatedInputs, setCalculatedInputs] = useState();
  const [result, setResult] = useState(null);
  const [draw, setDraw] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const calculatePanels = () => {
    const roofWidth = parseInt(inputs.roofWidth);
    const roofHeight = parseInt(inputs.roofHeight);
    const panelWidth = parseInt(inputs.panelWidth);
    const panelHeight = parseInt(inputs.panelHeight);

    const maxPanelsForRoof = calculatedPanelsRectangle(
      roofWidth,
      roofHeight,
      panelWidth,
      panelHeight
    );

    // Set results and draw panels
    setResult({
      maxPanels: maxPanelsForRoof.maxPanels,
      bestVertical: maxPanelsForRoof.bestVertical,
      bestHorizontal: maxPanelsForRoof.bestHorizontal,
    });
    setCalculatedInputs({
      roofWidth,
      roofHeight,
      panelWidth,
      panelHeight,
    });

    setDraw(
      drawRectangle(
        roofWidth,
        roofHeight,
        maxPanelsForRoof.bestHorizontal,
        maxPanelsForRoof.bestVertical,
        panelWidth,
        panelHeight
      )
    );
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
              className='mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
              role='alert'
            >
              <strong className='font-bold'>Resultado: </strong>
              <span className='block sm:inline'>
                {result.maxPanels} paneles pueden ser colocados.
              </span>
            </div>
            <div
              className='mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
              role='alert'
            >
              <strong className='font-bold'>
                De forma horizontal:{' '}
              </strong>
              <span className='block sm:inline'>
                {result.bestHorizontal} paneles pueden ser colocados.
              </span>
            </div>
            <div
              className='mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
              role='alert'
            >
              <strong className='font-bold'>De forma vertical: </strong>
              <span className='block sm:inline'>
                {result.bestVertical} paneles pueden ser colocados.
              </span>
            </div>
            <div className='flex items-center justify-center'>
              <div
                style={{
                  position: 'relative',
                  width: `${
                    calculatedInputs.roofWidth *
                    getScale(
                      calculatedInputs.roofWidth,
                      calculatedInputs.roofHeight
                    )
                  }px`,
                  height: `${
                    calculatedInputs.roofHeight *
                    getScale(
                      calculatedInputs.roofWidth,
                      calculatedInputs.roofHeight
                    )
                  }px`,
                  border: '2px solid black',
                  overflow: 'hidden',
                }}
              >
                {draw}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RectangularForm;
