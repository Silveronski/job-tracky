require('dotenv').config();
require('express-async-errors'); // async erros will automatically be caught and passed to the error handling middleware
                                 // without the need to catch the error or do 'next()'

const express = require('express');
const connectToDb = require('./db/connect');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const authenticateUser = require('./middleware/authentication');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use(errorHandler);
app.use(notFound);

connectToDb();

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});