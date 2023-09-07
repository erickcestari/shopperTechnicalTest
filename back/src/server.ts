import express from 'express'
import dotenv from 'dotenv'
import routes from './api/routes/routes';

dotenv.config()
export const app = express()

const port = process.env.PORT || 3000;

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})