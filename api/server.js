import express from 'express';
import process from 'process';
import router from './routes/routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});