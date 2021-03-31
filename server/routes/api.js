const router = require('express').Router()
const multer = require('multer')
const { paths, formats, operations } = require('../config')
const sharp = require('sharp')
const path = require('path')
const { nanoid } = require('nanoid')
const color = require('color')
const fs = require('fs')
const TextToSVG = require('text-to-svg')
const textToSVG = TextToSVG.loadSync()

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

/**
 * Ruta para obtener una imagen con distintas las distintas formas que tiene sharp para redimensionar una imagen
 */
router.post('/resize', upload.single('file'), (req, res, next) => {
  /**
   * Para obtener un array con las distintas formas en que se puede redimensionar la imagen
   * ver https://sharp.pixelplumbing.com/api-resize
   */
  const fits = Object.keys(sharp.fit)
  const options = fits.map((f) => {
    return {
      fit: f,
      path: path.join(paths.images, `${nanoid()}_${f}.webp`),
    }
  })

  const backColor = req.body.color || '#000000' // Algunas formas de redimensionar llenan con bandas de colores el espacio restante

  const filesToGenerate = options.map((file) => {
    return sharp(req.file.path)
      .resize({
        fit: file.fit,
        width: Number(req.body.width),
        height: Number(req.body.height),
        background: color(backColor).object(),
      })
      .webp()
      .toFile(file.path)
  })

  Promise.all(filesToGenerate)
    .then((results) => {
      const response = options.map((opt, idx) => {
        opt.info = results[idx]
        opt.path = path.basename(opt.path)
        return opt
      })
      // console.log(response)
      res.status(200).json(response)
    })
    .catch((e) => next(e))
})
/**
 * Ruta para convertir un gif en webp
 */
router.post('/gifwebp', upload.single('file'), async (req, res, next) => {
  console.time('gif')
  let results = []
  const destFile = path.join(paths.images, `${+new Date()}.webp`)
  await sharp(req.file.path, { pages: -1 })
    .webp({
      fit_max_size: true,
    })
    .toFile(destFile)
  Promise.all([sharp(req.file.path).metadata(), sharp(destFile).metadata()])
    .then((metadatas) => {
      console.timeEnd('gif')
      // Agrego la información del nombre
      results.push({
        info: metadatas[0],
      })
      results.push({
        info: metadatas[1],
      })
      results[0].path = path.basename(req.file.path)
      results[1].path = path.basename(destFile)

      // Agrego la información del tamaño
      results[0].info.size = fs.statSync(req.file.path).size
      results[1].info.size = fs.statSync(destFile).size

      res.status(200).json(results)
    })
    .catch((e) => next(e))
})

router.post('/operations', upload.single('file'), (req, res, next) => {
  console.time('operations')
  let destFiles = []

  const files = operations.map((operation) => {
    const destFile = path.join(
      paths.images,
      `${+new Date()}_${operation.name}.webp`
    )
    destFiles.push(path.basename(destFile))
    const sharpObject = sharp(req.file.path)
    sharpObject[operation.name](operation.params)
    return sharpObject.webp().toFile(destFile)
  })
  Promise.all(files)
    .then(() => {
      console.timeEnd('operations')
      const response = operations.map((operation, idx) => {
        return {
          operationName: operation.name,
          file: destFiles[idx],
        }
      })
      res.status(200).json(response)
    })
    .catch((e) => next(e))
})

/**
 * Para determinar el tamaño que va a tener la marca de agua
 * si fitToDest es verdadero deberemos cambiar el tamaño para
 * que coincida con la imagen original
 */
const setWatermarkSize = (req, metadatas) => {
  let width = 0
  let height = 0
  if (req.body && req.body.fitToDest === 'true') {
    width = metadatas[0].width
    height = metadatas[0].height
  } else {
    width = Math.min(metadatas[0].width, metadatas[1].width)
    height = Math.min(metadatas[0].height, metadatas[1].height)
  }
  return {
    width,
    height,
  }
}

const mustChangeSvgSize = (fileInputMetadata, textSvgMetadata) => {
  return (
    textSvgMetadata.width > fileInputMetadata.width ||
    textSvgMetadata.height > fileInputMetadata.height
  )
}

router.post('/composition', upload.single('file'), async (req, res, next) => {
  console.log('body', req.body)

  const pathFileWaterMark = path.join(paths.public, req.body.waterMarkFileName)
  const metadatas = await Promise.all([
    sharp(req.file.path).metadata(),
    sharp(pathFileWaterMark).metadata(),
  ])
  const fileInputMetadata = metadatas[0]
  // const watermarkMetadata = metadatas[1]

  const { width, height } = setWatermarkSize(req, metadatas)
  try {
    const watermarkImageBuffer = await sharp(pathFileWaterMark)
      .resize({
        width,
        height,
        fit: 'cover',
      })
      .toBuffer()
    /*
    let textWidth = Math.min(
      Math.floor(req.body.text.trim().length * 24),
      metadatas[0].width
    )
    textWidth -= 50
    console.log('textwidth', textWidth)
    const bufferTexto = new Buffer.from(`<svg>
        <rect x="0" y="0" width="${textWidth}" height="100" fill="rgba(0,0,0,0)"  text-align="center" />
        <text x="10" y="76" font-size="48" fill="${escapeHtml.safe(
          req.body.textColor
        )}" font-family = "Impact" 
        style="fill-opacity:1;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;">
        ${escapeHtml.safe(req.body.text)}
        </text>
        </svg>`)
    */
    const attributes = { fill: req.body.textColor, stroke: 'black' }
    const options = {
      x: 0,
      y: 0,
      fontSize: Number(req.body.textSize),
      anchor: 'top',
      attributes: attributes,
    }
    const svgText = textToSVG.getSVG(req.body.text.trim(), options)
    let svgBuffer = new Buffer.from(svgText)
    const bufferMetadata = await sharp(svgBuffer).metadata()

    if (mustChangeSvgSize(fileInputMetadata, bufferMetadata)) {
      if (bufferMetadata.width > fileInputMetadata.width) {
        svgBuffer = await sharp(svgBuffer)
          .resize({
            width: fileInputMetadata.width - 10,
          })
          .toBuffer()
      } else {
        svgBuffer = await sharp(svgBuffer)
          .resize({
            height: fileInputMetadata.height - 10,
          })
          .toBuffer()
      }
    }

    const destFile = path.join(paths.images, `${+new Date()}.webp`)
    await sharp(req.file.path)
      .composite([
        {
          input: watermarkImageBuffer,
          tile: req.body.tile === 'true',
          gravity: req.body.watermarkLocation,
        },
        {
          input: svgBuffer,
          gravity: req.body.textLocation,
        },
      ])
      .toFile(destFile)

    res.status(200).json(path.basename(destFile))
  } catch (e) {
    next(e)
  }
})

module.exports = router
