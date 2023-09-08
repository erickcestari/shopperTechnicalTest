import dotenv from 'dotenv';
import express from 'express';
import routes from './api/routes/routes';

dotenv.config()

export const app = express()

app.use((req, res, next) => {
  // Configuração de cabeçalhos CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS, POST, DELETE');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;
app.use(express.json()); 
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})