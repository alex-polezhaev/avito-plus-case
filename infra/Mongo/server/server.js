import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const {
  MONGO_PORT,
  ORIGIN,
  MONGO_URL,
} = process.env;
const app = express();

// Documentation
const __dirname = fileURLToPath(path.dirname(import.meta.url));

app.use(express.static(`${__dirname}/doc`));

app.get('/docs', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/doc` });
});

const logger = morgan('tiny');
app.use(logger);
app.use(express.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', ORIGIN);
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.set('Access-Control-Allow-Credentials', true);
  next();
});
// Route registration must come last
app.use(routes);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`DB connection error: ${err}`));

app.listen(MONGO_PORT, (err) => {
  if (!err) {
    console.log(`Listening port ${MONGO_PORT}`);
  } else {
    console.error(err);
    process.exit(1);
  }
});
