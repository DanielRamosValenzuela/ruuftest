'use client';

import { useState } from 'react';

const Rectangular = () => {
  const [inputs, setInputs] = useState({
    width: '',
    height: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [calculated, setCalculated] = useState({
    width: '',
    height: '',
    panelWidth: '',
    panelHeight: '',
  });
  const [layout, setLayout] = useState([]);
  const [scale, setScale] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateLayout();
  };

  const calculateLayout = () => {
    const { width, height, panelWidth, panelHeight } = inputs;
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    const pw = parseInt(panelWidth, 10);
    const ph = parseInt(panelHeight, 10);

    if (w > 0 && h > 0 && pw > 0 && ph > 0 && pw <= w && ph <= h) {
      const layoutHorizontal = Math.floor(w / pw) * Math.floor(h / ph);
      const layoutVertical = Math.floor(w / ph) * Math.floor(h / pw);
      const bestLayout = Math.max(layoutHorizontal, layoutVertical);

      let bestArrangement = [];
      if (bestLayout === layoutHorizontal) {
        for (let i = 0; i < Math.floor(h / ph); i++) {
          for (let j = 0; j < Math.floor(w / pw); j++) {
            bestArrangement.push({ x: j * pw, y: i * ph });
          }
        }
      } else {
        for (let i = 0; i < Math.floor(h / pw); i++) {
          for (let j = 0; j < Math.floor(w / ph); j++) {
            bestArrangement.push({ x: j * ph, y: i * pw });
          }
        }
      }
      setLayout(bestArrangement);
      const maxDimension = Math.max(w, h);
      const maxSizePx = 500;
      setCalculated(inputs);
      setScale(maxDimension / maxSizePx);
    } else {
      console.log(
        'Revise las dimensiones ingresadas. Los paneles deben ser menores que las dimensiones del techo y todos los valores deben ser mayores que cero.'
      );
      setLayout([]);
    }
  };

  const isButtonDisabled =
    !inputs.width ||
    !inputs.height ||
    !inputs.panelWidth ||
    !inputs.panelHeight;

  return (
    <div className='p-5 rounded shadow-lg'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mb-4'>
        <label className='block text-gray-700'>
          Ancho del techo (metros):
          <input
            type='number'
            name='width'
            value={inputs.width}
            onChange={handleInputChange}
            className='mt-1 p-2 border rounded w-full'
            placeholder='Ingrese el ancho del techo'
            required
          />
        </label>
        <label className='block text-gray-700'>
          Alto del techo (metros):
          <input
            type='number'
            name='height'
            value={inputs.height}
            onChange={handleInputChange}
            className='mt-1 p-2 border rounded w-full'
            placeholder='Ingrese el alto del techo'
            required
          />
        </label>
        <label className='block text-gray-700'>
          Ancho del panel solar (metros):
          <input
            type='number'
            name='panelWidth'
            value={inputs.panelWidth}
            onChange={handleInputChange}
            className='mt-1 p-2 border rounded w-full'
            placeholder='Ingrese el ancho del panel'
            required
          />
        </label>
        <label className='block text-gray-700'>
          Alto del panel solar (metros):
          <input
            type='number'
            name='panelHeight'
            value={inputs.panelHeight}
            onChange={handleInputChange}
            className='mt-1 p-2 border rounded w-full'
            placeholder='Ingrese el alto del panel'
            required
          />
        </label>
        <button
          type='submit'
          className={`px-4 py-2 rounded w-full text-white font-bold ${
            !inputs.width ||
            !inputs.height ||
            !inputs.panelWidth ||
            !inputs.panelHeight
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isButtonDisabled}
        >
          Calcular
        </button>
      </form>
      <span>Cantidad de paneles posibles: {layout.length}</span>
      <div
        className='mt-4 relative'
        style={{
          width: `${calculated.width / scale}px`,
          height: `${calculated.height / scale}px`,
          border: '1px solid black',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {layout.map((panel, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${panel.x / scale}px`,
              top: `${panel.y / scale}px`,
              width: `${calculated.panelWidth / scale}px`,
              height: `${calculated.panelHeight / scale}px`,
              backgroundColor: 'lightblue',
              border: '1px solid red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
              color: 'black',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Rectangular;
