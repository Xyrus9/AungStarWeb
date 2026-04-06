import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';  
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5010;
connectDB();
const app = express();

app.use(express.json()); // Parse JSON request bodies

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API Running!');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
