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
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const calculatePanels = () => {
    const w = Number(inputs.roofWidth);
    const h = Number(inputs.roofHeight);
    const pw = Number(inputs.panelWidth);
    const ph = Number(inputs.panelHeight);

    // Horizontal placement and vertical placement in remaining space
    const horizontalPanels = Math.floor(w / pw);
    const verticalPanels = Math.floor(h / ph);
    const remainingWidth = w - horizontalPanels * pw;
    const remainingHeight = h - verticalPanels * ph;

    const additionalPanelsV =
      remainingWidth > 0
        ? Math.floor(h / ph) * Math.floor(remainingWidth / ph)
        : 0;
    const additionalPanelsH =
      remainingHeight > 0
        ? Math.floor(w / pw) * Math.floor(remainingHeight / pw)
        : 0;

    // Consider vertical placement first and then horizontal
    const verticalFirstPanels = Math.floor(w / ph);
    const horizontalFirstPanels = Math.floor(h / pw);
    const remainingWidthFirst = w - verticalFirstPanels * ph;
    const remainingHeightFirst = h - horizontalFirstPanels * pw;

    const additionalPanelsFirstV =
      remainingWidthFirst > 0
        ? Math.floor(h / pw) * Math.floor(remainingWidthFirst / pw)
        : 0;
    const additionalPanelsFirstH =
      remainingHeightFirst > 0
        ? Math.floor(w / ph) * Math.floor(remainingHeightFirst / ph)
        : 0;

    // Calculate the maximum panels that can fit
    const maxPanels = Math.max(
      horizontalPanels * verticalPanels + additionalPanelsV + additionalPanelsH,
      verticalFirstPanels * horizontalFirstPanels +
        additionalPanelsFirstV +
        additionalPanelsFirstH
    );

    setResult({
      count: maxPanels,
      layout: {
        roofWidth: w,
        roofHeight: h,
        panelWidth: pw,
        panelHeight: ph,
        horizontalPanels,
        verticalPanels,
        additionalPanelsV,
        additionalPanelsH,
        additionalPanelsFirstV,
        additionalPanelsFirstH,
      },
    });
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      <div className='mb-5'>
        <label className='block font-medium mb-2'>Dimensiones del techo:</label>
        <input
          type='number'
          name='roofWidth'
          placeholder='Ancho'
          className='border p-2 mr-2 rounded'
          value={inputs.roofWidth}
          onChange={handleChange}
        />
        <input
          type='number'
          name='roofHeight'
          placeholder='Largo'
          className='border p-2 rounded'
          value={inputs.roofHeight}
          onChange={handleChange}
        />
      </div>
      <div className='mb-5'>
        <label className='block font-medium mb-2'>
          Dimensiones de los paneles solares:
        </label>
        <input
          type='number'
          name='panelWidth'
          placeholder='Ancho'
          className='border p-2 mr-2 rounded'
          value={inputs.panelWidth}
          onChange={handleChange}
        />
        <input
          type='number'
          name='panelHeight'
          placeholder='Largo'
          className='border p-2 rounded'
          value={inputs.panelHeight}
          onChange={handleChange}
        />
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={calculatePanels}
      >
        Calcular
      </button>
      {result && (
        <div className='mt-4'>
          <p className='text-lg'>
            Paneles posibles: <span className='font-bold'>{result.count}</span>
          </p>
          <Stage width={300} height={200}>
            <Layer>
              {Array.from({ length: result.layout.verticalPanels }).map(
                (_, i) =>
                  Array.from({ length: result.layout.horizontalPanels }).map(
                    (_, j) => (
                      <Rect
                        x={
                          (j * result.layout.panelWidth * 300) /
                          result.layout.roofWidth
                        }
                        y={
                          (i * result.layout.panelHeight * 200) /
                          result.layout.roofHeight
                        }
                        width={
                          (result.layout.panelWidth * 300) /
                          result.layout.roofWidth
                        }
                        height={
                          (result.layout.panelHeight * 200) /
                          result.layout.roofHeight
                        }
                        fill='lightblue'
                        stroke='black'
                        strokeWidth={1}
                      />
                    )
                  )
              )}
              {result.layout.additionalPanelsV &&
                Array.from({ length: result.layout.additionalPanelsV }).map(
                  (_, idx) => (
                    <Rect
                      x={
                        ((result.layout.horizontalPanels *
                          result.layout.panelWidth +
                          (idx % result.layout.horizontalPanels) *
                            result.layout.panelHeight) *
                          300) /
                        result.layout.roofWidth
                      }
                      y={
                        (Math.floor(idx / result.layout.horizontalPanels) *
                          result.layout.panelHeight *
                          200) /
                        result.layout.roofHeight
                      }
                      width={
                        (result.layout.panelHeight * 300) /
                        result.layout.roofWidth
                      }
                      height={
                        (result.layout.panelHeight * 200) /
                        result.layout.roofHeight
                      }
                      fill='red'
                      stroke='black'
                      strokeWidth={1}
                    />
                  )
                )}
            </Layer>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default RectangularForm;
