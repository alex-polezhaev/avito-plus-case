import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';

const {
  AUTH_PORT,
  ORIGIN,
} = process.env;
const app = express();

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

app.listen(AUTH_PORT, (err) => {
  if (!err) {
    console.log(`Listening port ${AUTH_PORT}`);
  } else {
    console.error(err);
    process.exit(1);
  }
});
