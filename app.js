const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandleMiddleware = require('./middleware/error-handler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandleMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
