import express from 'express';
import process from 'process';


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
