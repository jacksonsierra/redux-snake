import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Debug from 'debug'
import logger from 'morgan'
import path from 'path'

import index from './routes/index'

const app = express()
const debug = Debug('redux-snake:app')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/', index)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.status(err.status || 500)
  res.json(err)
})

process.on('uncaughException', (err) => {
  debug('Caught exception: %j', err)
  process.exit(1)
})

export default app
