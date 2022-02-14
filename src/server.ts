import "reflect-metadata"
require('dotenv').config();
import express from 'express'
import routes from './routes'
import cors from 'cors'
import './database/index'

const server = express()

server.use(cors());
server.use(express.json())
server.use(routes)

server.listen(process.env.PORT, () => {
  console.log('server started on port 5555')
})

