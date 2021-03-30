const router = require('express').Router()
const multer = require('multer')
const { paths, formats } = require('../config')
const sharp = require('sharp')
const path = require('path')
const { nanoid } = require('nanoid')

const storage = multer.diskStorage({
  destination: paths.images,
  filename: (req, file, cb) => {
    // El nombre del archivo que se va a generar, uso file.originalname para obtener la extensión
    const filename = `${nanoid()}${path.extname(file.originalname)}`
    cb(null, filename)
  },
})

const upload = multer({
  storage,
})

router.get('/', (req, res) => {
  // Solo para probar que la api está funcionando
  res.sendStatus(200)
})

/**
 * Ruta para generar un archivo con los diferentes formatos a los que nos permite exportar sharp
 */
router.post('/formats', upload.single('file'), (req, res, next) => {
  const files = formats.map((format) => {
    return `${paths.images}/${nanoid()}.${format}`
  }) // Files será el array con los paths de los archivos que se van a generar

  const commands = files.map((file) => {
    /**
     * sharp retorna una promesa, por lo que almaceno todos los formatos que voy a generar
     * para luego ejecutarlo con Promise.all
     */
    return sharp(req.file.path).toFile(file)
  })

  Promise.all(commands)
    .then((response) => {
      /**
       * Si la respuesta de sharp es exitosa, devuelve la información del archivo generado, como commands es un array
       * la respuesta será un array con la información de todos los archivos generados
       */
      const infoToSend = response.map((fileInfo, idx) => {
        /**
         * Las respuestas se devuelven en el mismo orden que se pasaron, por lo que puedo obtener el nombre del archivo
         * mediante su índice en el array files
         */
        fileInfo.fileBaseName = path.basename(files[idx])
        return fileInfo
      })

      res.status(200).json(infoToSend)
    })
    .catch((e) => next(e))
})

module.exports = router
