import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.APP_PORT;
const __dirname = fileURLToPath(path.dirname(import.meta.url));

app.use(express.static(path.join(__dirname, 'public/media')));
app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));

const indexPath = path.resolve('dist', 'index.html');
const createReqHandler = () => (req, res) => res.sendFile(indexPath);

app.get('*', createReqHandler());
