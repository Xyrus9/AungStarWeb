import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';  
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
import { getTodayGoldPriceSnapshot } from './data/goldPrices.js';

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('API Running!');
});

app.use('/api/products', productRoutes);
app.get('/api/gold-prices', (req, res) => {
    res.json(getTodayGoldPriceSnapshot());
});

app.use(notFound);
app.use(errorHandler);  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
