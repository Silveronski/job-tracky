require('dotenv').config();
require('express-async-errors'); // async erros will automatically be caught and passed to the error handling middleware
                                 // without the need to catch the error or do 'next()'

const express = require('express');
// const mainRouter = require('./routes/mainRoute');
// const notFound = require('./middleware/notFound');
// const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
// app.use('/api/v1', mainRouter);
// app.use(errorHandler);
// app.use(notFound);

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});