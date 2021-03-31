const path = require('path')
const publicPath = path.join(__dirname, '../public')

module.exports = {
  paths: {
    images: path.join(publicPath, '/images'),
    public: publicPath,
  },
  formats: ['jpg', 'webp', 'png', 'tiff'],
  operations: [
    { name: 'rotate', params: 60 },
    { name: 'flip', params: true },
    { name: 'flop', params: true },
    {
      name: 'sharpen',
      params: 2,
    },
    { name: 'blur', params: 20 },

    { name: 'median', params: 10 },
    {
      name: 'flatten',
      params: {
        background: { r: 255, g: 0, b: 0 },
      },
    },
    {
      name: 'convolve',
      params: {
        width: 3,
        height: 3,
        kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
      },
    },
    {
      name: 'threshold',
      params: 220,
    },
    { name: 'negate', params: true },
    { name: 'gamma', params: 3 },
    { name: 'normalise', params: true },
    {
      name: 'linear',
      params: 10,
    },
    {
      name: 'recomb',
      params: [
        [0.3588, 0.7044, 0.1368],
        [0.299, 0.587, 0.114],
        [0.2392, 0.4696, 0.0912],
      ],
    },
    {
      name: 'modulate',
      params: {
        brightness: 0.5,
        saturation: 0.5,
        hue: 45,
      },
    },
    /*
    
    {name: 'normalise', params: {}},
    {name: 'linear', params: {}},
    {name: 'modulate', params: {}},
    */
  ],
}
