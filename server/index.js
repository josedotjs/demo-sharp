const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const api = require('./routes/api')

app.use('/images', express.static(`${__dirname}/public/images`))
app.use(express.json())

app.use('/api', api)

app.listen(PORT, () => console.log(`App listen at localhost:${PORT}`))
