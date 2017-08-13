import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

export default router
