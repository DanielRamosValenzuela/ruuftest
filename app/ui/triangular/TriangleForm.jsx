'use client';

import React, { useState } from 'react';
import { calculatedPanelsTriangle } from '@/app/utils/calculatedPanelsTriangle';
import TriangleVisualization from './TriangleVisualization';

const TriangleForm = () => {
  const [inputs, setInputs] = useState({
    roofBase: '',
    roofHeight: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [calculatedInputs, setCalculatedInputs] = useState({
    roofBase: '',
    roofHeight: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const calculatePanels = () => {
    const roofBase = parseInt(inputs.roofBase);
    const roofHeight = parseInt(inputs.roofHeight);
    const panelWidth = parseInt(inputs.panelWidth);
    const panelHeight = parseInt(inputs.panelHeight);

    const maxPanelsForRoof = calculatedPanelsTriangle(
      roofBase,
      roofHeight,
      panelWidth,
      panelHeight
    );

    setCalculatedInputs(inputs);
    setResult({
      maxPanels: maxPanelsForRoof,
    });
  };

  return (
    <div className='flex flex-col items-center justify-center mt-5'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
        <div className='mb-4'>
          <label
            className='block text-grey-darker text-sm font-bold mb-2'
            htmlFor='roofBase'
          >
            Base del techo (metros)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            id='roofBase'
            name='roofBase'
            type='number'
            placeholder='Ancho'
            value={inputs.roofBase}
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
          <>
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
            </div>
            <TriangleVisualization
              roofBase={parseInt(calculatedInputs.roofBase)}
              roofHeight={parseInt(calculatedInputs.roofHeight)}
              panelWidth={parseInt(calculatedInputs.panelWidth)}
              panelHeight={parseInt(calculatedInputs.panelHeight)}
              maxPanels={parseInt(result.maxPanels)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TriangleForm;
