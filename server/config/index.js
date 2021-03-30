const path = require('path')
const publicPath = path.join(__dirname, '../public')

module.exports = {
  paths: {
    images: path.join(publicPath, '/images'),
  },
  formats: ['jpg', 'webp', 'png', 'tiff'],
}
